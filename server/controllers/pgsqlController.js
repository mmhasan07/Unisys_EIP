const { pool } = require('../Databases/postgresqlConnector')



module.exports.getAllTables = async (req, res) => {
  try {
    const query = `
          SELECT table_name
          FROM information_schema.tables
          WHERE table_schema = 'public'
          AND table_type = 'BASE TABLE';
      `;

    const result = await pool.query(query);
    const tables = result.rows.map(row => row.table_name);

    res.json({ success: true, tables: tables });
  } catch (error) {
    console.error(error);
    res.status(500).json({ error: 'Internal Server Error' });
  }
};


module.exports.getRows = async (req, res) => {
  try {
    const { tableName } = req.params;

    const query = `SELECT * from ${tableName}`
    const result = await pool.query(query)

    res.json({ success: true, tableData: result.rows })
  } catch (error) {
    console.error(error);
    res.status(500).json({ error: 'Internal Server Error' });
  }
};

module.exports.getColumnNames = async (req, res) => {
  try {
    const { tableName } = req.params;

    const query = `
      SELECT column_name
      FROM information_schema.columns
      WHERE table_name = $1
      ORDER BY ordinal_position;
    `;
    
    const result = await pool.query(query, [tableName]);
    
    const columnNames = result.rows.reduce((acc, row) => {
      acc[row.column_name] = '';
      return acc;
    }, {});

    res.json({ success: true, columnNames: columnNames });
  } catch (error) {
    console.error(error);
    res.status(500).json({ error: 'Internal Server Error' });
  }
};


module.exports.createRow = async (req, res) => {
  try {
    const { tableName, row } = req.body;

    const columns = Object.keys(row).join(', ');
    const values = Object.values(row);

    const placeholders = values.map((_, index) => `$${index + 1}`).join(', ');
    const query = `INSERT INTO ${tableName} (${columns}) VALUES (${placeholders}) RETURNING *`;

    const result = await pool.query(query, values);

    res.json({ success: true, insertedRow: result.rows[0] });
  } catch (error) {
    console.error(error);
    res.status(500).json({ error: 'Internal Server Error' });
  }
};

module.exports.createMultipleRows = async (req, res) => {
  try {
    const { tableName, data } = req.body;

    // Construct the SQL query string
    const columns = Object.keys(data[0]).join(',');
    const values = data.map(row => '(' + Object.values(row).map(value => `'${value}'`).join(',') + ')').join(',');
    const query = `INSERT INTO ${tableName} (${columns}) VALUES ${values}`;

    // Execute the query
    const result = await pool.query(query);

    res.json({ success: true, result: result });
  } catch (error) {
    console.error(error);
    res.status(500).json({ error: 'Internal Server Error' });
  }
};



module.exports.deleteRow = async (req, res) => {
  try {
    const { tableName, row } = req.body;

    // Extract column names and values from row object
    const columns = Object.keys(row);
    const values = Object.values(row);

    // Construct WHERE clause to match all columns in the row
    const whereClause = columns.map((col, index) => `${col} = $${index + 1}`).join(' AND ');

    // Construct parameterized delete query
    const query = `DELETE FROM ${tableName} WHERE ${whereClause}`;

    // Execute the query with values as parameters
    const result = await pool.query(query, values);

    res.json({ success: true, message: `Row deleted from ${tableName}` });
  } catch (error) {
    console.error(error);
    res.status(500).json({ error: 'Internal Server Error' });
  }
};

module.exports.editRow = async (req, res) => {
  try {
    const { tableName, old_row, new_row } = req.body;

    // Extract column names and values from the old and new rows
    const old_columns = Object.keys(old_row);
    const new_columns = Object.keys(new_row);
    const old_values = Object.values(old_row);
    const new_values = Object.values(new_row);

    // Construct WHERE clause to match all columns in the old row
    const whereClause = old_columns.map((col, index) => `${col} = $${index + 1}`).join(' AND ');

    // Construct parameterized update query
    const updateColumns = new_columns.map((col, index) => `${col} = $${old_columns.length + index + 1}`).join(', ');
    const query = `UPDATE ${tableName} SET ${updateColumns} WHERE ${whereClause}`;

    // Execute the query with old values followed by new values as parameters
    const result = await pool.query(query, [...old_values, ...new_values]);

    res.json({ success: true, message: `Row updated in ${tableName}` });
  } catch (error) {
    console.error(error);
    res.status(500).json({ error: 'Internal Server Error' });
  }
};


