var db = require('../db')

const Database = {

  async create(req, res) {
    const text = `INSERT INTO
    active_driver(driver_id, taxi_id, pos_lat, pos_long)
      VALUES($1, $2, $3, $4) returning *`

    const values = [
      req.params.driverID,
      req.body.taxi_id,
      req.body.pos_lat,
      req.body.pos_long
    ]

    try {
      const response = await db.db.query(text, values)
      if (response.severity == 'ERROR') {
        console.log(response)
        throw "database error"
      }

      return res.status(201).send({
        driver_id: response.rows[0].driver_id,
        taxi_id: response.rows[0].taxi_id,
        pos_lat: response.rows[0].pos_lat,
        pos_long: response.rows[0].pos_long
      })
    } catch(error) {
      console.log(error)
      return res.status(400).json({error: error})
    }
  },

  async get(req, res) {
    const text = 'SELECT * FROM driver WHERE driver_id = $1'

    try {
      const { rows } = await db.db.query(text, [req.params.driverID])
      if (!rows[0]) {
        return res.status(404).json({error: 'driver not found'})
      }

      return res.status(200).json({
        driver_id: rows[0].driver_id,
        taxi_id: rows[0].taxi_id,
        pos_lat: rows[0].pos_lat,
        pos_long: rows[0].pos_long
      })
    } catch(error) {
      console.log(error)
      return res.status(400).json({error: error})
    }
  },

  async getNear(req, res) {
    const query = `SELECT * FROM (
      (SELECT driver_id, SUM(score) AS score, COUNT(score) AS total FROM trip GROUP BY driver_id) AS scores
      NATURAL JOIN (SELECT * FROM active_driver WHERE pos_lat >= $1 AND pos_lat <= $2 AND pos_long >= $3 AND pos_long <= $4) AS drivers)`
    const values = [req.body.pos_lat - 0.01, req.body.pos_lat + 0.01, req.body.pos_long - 0.01, req.body.pos_long + 0.01]

    try {
      const response = await db.db.query(query, values)
      if (response.severity == 'ERROR') {
        console.log(response)
        throw "database error"
      }
      
      var drivers = []
      for (const driver of response.rows) {
        let score = (driver.score + 5) / (parseFloat(driver.total) + 1)

        drivers.push({
          driver_id: driver.driver_id,
          pos_lat: driver.pos_lat,
          pos_long: driver.pos_long,
          score: score
        })
      }

      return res.status(200).json(drivers);
    } catch(error) {
      console.log(error)
      return res.status(400).json({error: error})
    }
  },

  async delete(req, res) {
    const deleteTrip = 'DELETE FROM available_trips WHERE driver_id=$1'
    const query = 'DELETE FROM active_driver WHERE driver_id=$1 returning *'

    try {
      let response = await db.db.query(deleteTrip, [req.params.driverID])
      if (response.severity == 'ERROR') {
        console.log(response)
        throw "database error"
      }

      response = await db.db.query(query, [req.params.driverID])
      if (response.severity == 'ERROR') {
        console.log(response)
        throw "database error"
      }
      
      if (!response.rows[0]) {
        return res.status(404).json({ message: 'driver not active' })
      }
      
      return res.status(200).json({
        driver_id: response.rows[0].driver_id,
        taxi_id: response.rows[0].taxi_id,
        pos_lat: response.rows[0].pos_lat,
        pos_long: response.rows[0].pos_long
      })
    } catch(error) {
      console.log(error)
      return res.status(400).json({error: error})
    }
  }
}

module.exports.Database  = Database