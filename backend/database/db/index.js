
var { Client } = require('pg');
var dotenv = require('dotenv');
dotenv.config();

const pool = new Client({
  user: 'postgres',
  host: 'localhost',
  database: 'bases',
  password: 'root',
  port: 5432,
  //connectionString: process.env.DATABASE_URL
});

module.exports.pool = pool

module.exports.db = {
  /**
   * DB Query
   * @param {object} req
   * @param {object} res
   * @returns {object} object 
   */
  query(text, params){
    console.log("ayuda")
    console.log(process.env.DATABASE_URL)
    //return new Promise((resolve, reject) => {
      return pool.query(text, params)
      .then((res) => {
        console.log("Y si preguntamos")
        return res;
      })
      .catch((err) => {
        console.log("Cesar debe saber")
        return err;
      })
      .finally(() => {
        console.log("Por favor")
      })
    //})
  }
}