var db = require('../db')

const Database = {

  async create(req, res) {
    const text = `INSERT INTO
      taxi(taxi_id, model, year, soat, trunk, brand)
      VALUES($1, $2, $3, $4, $5, $6) returning *`;
    const values = [
      req.params.taxiID,
      req.body.model,
      req.body.year,
      req.body.soat,
      req.body.trunk,
      req.body.brand
    ]

    try {
      let response = await db.db.query(text, values)
      if (response.severity == 'ERROR') {
        console.log(response)
        throw "database error"
      }

      return res.status(200).json({
        taxi_id: response.rows[0].taxi_id,
        model: response.rows[0].model,
        year: response.rows[0].year,
        soat: response.rows[0].soat,
        trunk: response.rows[0].trunk,
        brand: response.rows[0].brand
      })
    } catch(error) {
      console.log(error)
      return res.status(400).json({ error: error })
    }
  },

  async get(req, res) {
    const text = 'SELECT * FROM taxi WHERE taxi_id = $1'

    try {
      const { rows } = await db.db.query(text, [req.params.taxiID])
      if (!rows[0]) {
        return res.status(404).json({error: 'taxi not found'})
      }

      return res.status(200).json({
        taxi_id: rows[0].taxi_id,
        model: rows[0].model,
        year: rows[0].year,
        soat: rows[0].soat,
        trunk: rows[0].trunk,
        brand: rows[0].brand
      })
    } catch(error) {
      console.log(error)
      return res.status(400).json({error: error})
    }
  },

  async update(req, res) {
    const findOneQuery = 'SELECT * FROM taxi WHERE taxi_id=$1'
    const updateOneQuery =`UPDATE taxi
      SET model=$1, year=$2, soat=$3, trunk=$4, brand=$5
      WHERE taxi_id=$6 returning *`
    
    try {
      const { rows } = await db.db.query(findOneQuery, [req.params.taxiID])
      if(!rows[0]) {
        return res.status(404).json({error: 'taxi not found'})
      }

      const values = [
        req.body.model || rows[0].model,
        req.body.year || rows[0].year,
        req.body.soat || rows[0].soat,
        req.body.trunk || rows[0].trunk,
        req.body.brand || rows[0].brand,
        req.params.taxiID
      ]

      const response = await db.db.query(updateOneQuery, values)
      return res.status(200).json({
        taxi_id: rows[0].taxi_id,
        model: rows[0].model,
        year: rows[0].year,
        soat: rows[0].soat,
        trunk: rows[0].trunk,
        brand: rows[0].brand
      })
    } catch(error) {
      console.log(error)
      return res.status(400).json({error: error})
    }
  }
}

module.exports.Database  = Database