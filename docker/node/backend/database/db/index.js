
var { Pool } = require('pg')
var dotenv = require('dotenv')
dotenv.config()

const pool = new Pool({
  user: 'postgres',
  host: 'database',
  database: 'DBs_project',
  password: 'postgress',
  port: 5432,
  //connectionString: process.env.DATABASE_URL
});
pool.connect()
module.exports.pool = pool

module.exports.db = {
  query(text, params){
    return pool.query(text, params)
    .then((res) => {
      return res
    })
    .catch((err) => {
      return err
    })
  }
}