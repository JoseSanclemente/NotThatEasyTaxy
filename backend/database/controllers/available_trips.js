var db = require('../db')

const Database = {

  async create(req, res) {
    const query = `INSERT INTO
      available_trips(client_id, driver_id, orig_pos_lat, orig_pos_long, dest_pos_lat, dest_pos_long)
      VALUES($1, $2, $3, $4, $5, $6) returning *`

    try {
      var trips = []
      for (const driver of req.body.drivers) {
        const values = [
          req.params.clientID,
          driver,
          req.body.orig_pos_lat,
          req.body.orig_pos_long,
          req.body.dest_pos_lat,
          req.body.dest_pos_long
        ]

        const response = await db.db.query(query, values)
        if (response.severity == 'ERROR') {
          console.log(response)
          throw "database error"
        }

        trips.push({
          client_id: response.rows[0].client_id,
          driver_id: response.rows[0].driver_id,
          orig_pos_lat: response.rows[0].orig_pos_lat,
          orig_pos_long: response.rows[0].orig_pos_long,
          dest_pos_lat: response.rows[0].dest_pos_lat,
          dest_pos_long: response.rows[0].dest_pos_long,
        })
      }
      
      return res.status(200).json(trips)
    } catch (error) {
      return res.status(400).json({ error: error })
    }
  },

  async delete(req, res) {
    const query = `DELETE FROM available_trips
      WHERE trip_id = $1`

    try {
      const { rows } = await db.db.query(query, [req.params.trip_id])
      return res.status(201).json(rows[0])
    } catch (error) {
      return res.status(400).json({ error: error })
    }
  },

  async getDriverTrips(req, res) {
    const query = `SELECT * FROM available_trips
      WHERE driver_id = $1`

    try {
      const response = await db.db.query(query, [req.params.driverID])
      if (response.severity == 'ERROR') {
        console.log(response)
        throw "database error"
      }

      var trips = []
      for (const trip of response.rows) {
        trips.push({
          driver_id: trip.driver_id,
          client_id: trip.client_id,
          orig_pos_lat: trip.orig_pos_lat,
          orig_pos_long: trip.orig_pos_long,
          dest_pos_lat: trip.dest_pos_lat,
          dest_pos_long: trip.dest_pos_long
        })
      }

      return res.status(200).json(trips)
    } catch (error) {
      console.log(error)
      return res.status(400).json({ error: error })
    }
  },

  async check(req, res) {
    const query = `SELECT * FROM available_trips
      WHERE client_id = $1`

    try {
      const response = await db.db.query(query, [req.params.clientID])
      if (response.severity == 'ERROR') {
        console.log(response)
        throw "database error"
      }

      if (!response.rows[0]) {
        return res.status(200).json({ message: "ok", pending: false})
      }

      return res.status(200).json({ message: "pending", pending: true})
    } catch (error) {
      return res.status(400).json({ error: error })
    }
  }
}

module.exports.Database  = Database