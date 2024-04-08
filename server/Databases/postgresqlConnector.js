const Pool = require('pg').Pool


const pool = new Pool({
    user:"postgres",
    host: "localhost",
    database: "testdb",
    password: "password",
    dialect: 'postgres',
    port: '5432'
}) 

const connectToPgSql = () => {
    pool.connect((err, client, release) => {
        if(err){
            return console.error(
                'Error in connection', err.stack
            )
        }
        client.query('SELECT NOW()', (err, result)=>{
            release()
            if(err){
                return console.error(
                    'Error executing query', err.stack
                )
            }
            console.log("Connected to PgDatabase.")
        })
    })
}

module.exports = {connectToPgSql, pool}
