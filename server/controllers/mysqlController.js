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