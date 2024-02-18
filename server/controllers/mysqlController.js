const db = require('../Databases/mysqlConnector')

module.exports.getTables = async (req, res) => {
    try {
      const [rows] = await db.promise().query('SHOW TABLES');
      const tables = rows.map((row) => Object.values(row)[0]);
      res.json({ tables });
    } catch (error) {
      console.error(error);
      res.status(500).json({ error: 'Internal Server Error' });
    }
  };

  module.exports.getTableData = async (req, res) => {

    const { tableName } = req.params;

    if (!tableName) {
        return res.status(400).json({ error: 'Table name is required' });
    }

    try {
        const [rows] = await db.promise().query(`SELECT * FROM ${tableName}`);
        const tableData = rows;
        res.json({ tableData });
    } catch (error) {
        console.error(error);
        res.status(500).json({ error: 'Internal Server Error' });
    }
};

module.exports.getTableColumns = async (req, res) => {
  const { tableName } = req.params;

  if (!tableName) {
      return res.status(400).json({ error: 'Table name is required' });
  }

  try {
      const [columns] = await db.promise().query(`SHOW COLUMNS FROM ${tableName}`);

       const columnNames = columns.reduce((acc, column) => {
          acc[column.Field] = "";
          return acc;
      }, {});

      res.json({columnNames});
  } catch (error) {
      console.error(error);
      res.status(500).json({ error: 'Internal Server Error' });
  }
};


module.exports.createRow = async (req, res) => {
  const { tableName, row } = req.body;

  const formattedValues = Object.values(row).map(value => {
      if (typeof value === 'string') {
          return `'${value}'`;
      }
      return value;
  });

  const valuesString = formattedValues.join(',');

  try {
      await db.promise().query(`INSERT INTO ${tableName} VALUES (${valuesString})`);

      res.json({ status: true, tableName });
  } catch (error) {
      console.error(error);
      res.status(500).json({ error: 'Internal Server Error' });
  }
};



module.exports.editRow = async (req, res) => {
  const { tableName, row } = req.body;

  try {
      const updateValues = Object.entries(row).map(([key, value]) => {
          if (typeof value === 'string') {
              return `${key} = '${value}'`;
          }
          return `${key} = ${value}`;
      });

      const setClause = updateValues.join(', ');

      await db.promise().query(`UPDATE ${tableName} SET ${setClause} WHERE id = ${row.id}`);

      res.json({ status: true, tableName });
  } catch (error) {
      console.error(error);
      res.status(500).json({ error: 'Internal Server Error' });
  }
};



module.exports.deleteRow = async (req, res) => {

  const { tableName, row } = req.body;

  await db.promise().query(`DELETE FROM ${tableName} where id = ${row.id}`);
  console.log(tableName)

  try {
    res.json({ status: true, tableName });
  } catch (error) {
      
  }
};