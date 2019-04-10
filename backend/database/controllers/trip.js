var db = require('../db')
const uuidv4 = require('uuid/v4');

const Database = {
  async create(req, res) {
    const query = `INSERT INTO
                    available_trip(client_id, driver_id, orig_pos_lat, orig_pos_long, dest_pos_lat, dest_pos_long)
                    VALUES($1, $2, $3, $4, $5, $6)
                    returning *`
    const values = [
        uuidv4(),
        req.params.driverID,
        req.body.driver_id
    ]

    try {
        const { rows } = await db.db.query(query, values)
        return res.status(200).send({
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
        return res.status(400).send({ error: error })
    }
  },

  async getUnpaid(req, res) {
    const query = ``
    const values = []

    if (req.params.driverID != undefined) {
        query = `DELETE FROM trip
        WHERE driver_id = $1 AND paid_out = FALSE;`
        values.push(req.params.driverID)
    }

    if (req.params.clientID != undefined) {
        query = `DELETE FROM trip
        WHERE client_id = $1 AND charged = FALSE;`
        values.push(req.params.clientID)
    }
    
    try {
        const { rows } = await db.db.query(query, values)
        
        var trips = []
        rows.array.forEach(trip => {
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
        });

      return res.status(200).json(trips)
    } catch (error) {
      return res.status(400).json({ error: error })
    }
  },

  async pay(req, res) {
    const query = ``

    if (req.params.driverID != undefined) {
        query = `UPDATE trip SET paid_out=TRUE WHERE trip_id=$1`
    }

    if (req.params.clientID != undefined) {
        query = `UPDATE trip SET charged=TRUE WHERE trip_id=$1`
    }

    try {
        var trips = []

        req.body.trips.forEach(trip => {
            const { rows } = await db.db.query(query, [trip])
            rows.array.forEach(trip => {
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
            });
        })

      return res.status(200).json(trips)
    } catch (error) {
      return res.status(400).json({ error: error })
    }
  }
}
