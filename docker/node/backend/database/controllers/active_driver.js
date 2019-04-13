var db = require('../db');

const Database = {
  async create(req, res) {
    const text = `INSERT INTO
    active_driver(driver_id, taxi_id, pos_lat, pos_long)
      VALUES($1, $2, $3, $4)
      returning *`;
    const values = [
      req.params.driverID,
      req.body.taxi_id,
      req.body.pos_lat,
      req.body.pos_long
    ];

    try {
      const { rows } = await db.db.query(text, values);
      return res.status(201).send({
        driver_id: rows[0].driver_id,
        taxi_id: rows[0].taxi_id,
        pos_lat: rows[0].pos_lat,
        pos_long: rows[0].pos_long
      });
    } catch(error) {
      console.log(error)
      return res.status(400).json({error: error});
    }
  },

  async get(req, res) {
    const text = 'SELECT * FROM driver WHERE driver_id = $1';
    try {
      const { rows } = await db.db.query(text, [req.params.driverID]);
      if (!rows[0]) {
        return res.status(404).json({error: 'driver not found'});
      }
      return res.status(200).json({
        driver_id: rows[0].driver_id,
        taxi_id: rows[0].taxi_id,
        pos_lat: rows[0].pos_lat,
        pos_long: rows[0].pos_long
      });
    } catch(error) {
      console.log(error)
      return res.status(400).json({error: error})
    }
  },

  async getNear(req, res) {
    const text = 'SELECT * FROM active_driver WHERE pos_lat >= $1 AND pos_lat <= $2 AND pos_long >= $3 AND pos_long <= $4';
    const values = [req.body.pos_lat - 0.01, req.body.pos_lat + 0.01, req.body.pos_long - 0.01, req.body.pos_long + 0.01]
    try {
      const { rows } = await db.db.query(text, values);
      
      var drivers = []
      rows.forEach(driver => {
        drivers.push({
          driver_id: driver.driver_id,
          pos_lat: driver.pos_lat,
          pos_long: driver.pos_long
        })
      })
      return res.status(200).json(drivers);
    } catch(error) {
      console.log(error)
      return res.status(400).json({error: error})
    }
  },

  async delete(req, res) {
    const query = 'DELETE FROM active_driver WHERE driver_id=$1 returning *';
    try {
      const { rows } = await db.db.query(query, [req.params.driverID]);
      if (!rows[0]) {
        return res.status(404).json({ message: 'driver not active' });
      }
      
      return res.status(200).json({
        driver_id: rows[0].driver_id,
        taxi_id: rows[0].taxi_id,
        pos_lat: rows[0].pos_lat,
        pos_long: rows[0].pos_long
      });
    } catch(error) {
      console.log(error)
      return res.status(400).json({error: error});
    }
  }
}

module.exports.Database  = Database;