var db = require('../db')
const uuidv4 = require('uuid/v4')

const Database = {
  
  async create(req, res) {
    const query = `INSERT INTO
    trip(trip_id, driver_id, client_id, orig_pos_lat, orig_pos_long, dest_pos_lat, dest_pos_long, date, charged, paid_out)
    VALUES($1, $2, $3, $4, $5, $6, $7, to_timestamp($8), FALSE, FALSE)
    returning *`
    const values = [
        uuidv4(),
        req.params.driverID,
        req.body.client_id,
        req.body.orig_pos_lat,
        req.body.orig_pos_long,
        req.body.dest_pos_lat,
        req.body.dest_pos_long,
        Date.now() / 1000.0
    ]

    try {
        const  response  = await db.db.query(query, values)
        const rows = response.rows

        return res.status(200).json({
            trip_id: rows[0].trip_id,
            driver_id: rows[0].driver_id,
            client_id: rows[0].client_id,
            orig_pos_lat: rows[0].orig_pos_lat,
            orig_pos_long: rows[0].orig_pos_long,
            dest_pos_lat: rows[0].orig_pos_lat,
            dest_pos_long: rows[0].orig_pos_long,
            score : rows[0].score,
            date: rows[0].date,
            charged: rows[0].charged,
            paid_out: rows[0].paid_out
        })
    } catch (error) {
      console.log(error)
      return res.status(400).json({ error: error })
    }
  },

  async getUnpaid(req, res) {
    var query = ``
    var values = []

    if (req.params.driverID != undefined) {
        query = `SELECT * FROM trip
          WHERE driver_id = $1 AND paid_out = FALSE AND charged = TRUE`
        values.push(req.params.driverID)
    }

    if (req.params.clientID != undefined) {
        query = `SELECT * FROM trip
          WHERE client_id = $1 AND charged = FALSE`
        values.push(req.params.clientID)
    }
    
    try {
        const { rows } = await db.db.query(query, values)

        var trips = []
        for (const trip of rows) {
          trips.push({
            trip_id: trip.trip_id,
            driver_id: trip.driver_id,
            client_id: trip.client_id,
            orig_pos_lat: trip.orig_pos_lat,
            orig_pos_long: trip.orig_pos_long,
            dest_pos_lat: trip.dest_pos_lat,
            dest_pos_long: trip.dest_pos_long,
            score : trip.score,
            date: trip.date,
            charged: trip.charged,
            paid_out: trip.paid_out
          })
        }

      return res.status(200).json(trips)
    } catch (error) {
      console.log(error)
      return res.status(400).json({ error: error })
    }
  },

  async pay(req, res) {
    var query = ``

    if (req.params.driverID != undefined) {
        query = `UPDATE trip SET paid_out=TRUE WHERE trip_id=$1`
    }

    if (req.params.clientID != undefined) {
        query = `UPDATE trip SET charged=TRUE WHERE trip_id=$1`
    }

    try {
        var trips = []

        req.body.trips.forEach(async trip => {
          const { rows } = await db.db.query(query, [trip])
          rows.forEach(trip => {
            trips.push({
              trip_id: trip.trip_id,
              driver_id: trip.driver_id,
              client_id: trip.client_id,
              orig_pos_lat: trip.orig_pos_lat,
              orig_pos_long: trip.orig_pos_long,
              dest_pos_lat: trip.dest_pos_lat,
              dest_pos_long: trip.dest_pos_long,
              score : trip.score,
              date: trip.date,
              charged: trip.charged,
              paid_out: trip.paid_out
            })
          })
        })

      return res.status(200).json(trips)
    } catch (error) {
      console.log(error)
      return res.status(400).json({ error: error })
    }
  },
  
  async score(req, res) {
    let query = `UPDATE trip SET score = $1 WHERE trip_id = $2 AND client_id = $3 returning *`
    let values = [req.body.score, req.body.trip_id, req.params.clientID]

    try {
      const response = await db.db.query(query, values)
      if (response.severity == 'ERROR') {
        console.log(response)
        throw "database error"
      }
      
      return res.status(200).json({
        trip_id: response.rows[0].trip_id,
        driver_id: response.rows[0].driver_id,
        client_id: response.rows[0].client_id,
        orig_pos_lat: response.rows[0].orig_pos_lat,
        orig_pos_long: response.rows[0].orig_pos_long,
        dest_pos_lat: response.rows[0].dest_pos_lat,
        dest_pos_long: response.rows[0].dest_pos_long,
        score : response.rows[0].score,
        date: response.rows[0].date,
        charged: response.rows[0].charged,
        paid_out: response.rows[0].paid_out
      })
    } catch (error) {
      console.log(error)
      return res.status(400).json({ error: error })
    }
  }
}

module.exports.Database  = Database