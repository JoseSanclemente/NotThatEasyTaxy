var db = require('../db');

const Database = {
  async create(req, res) {
    const text = `INSERT INTO
    active_driver(driver_id, plate, pos_lat, pos_long)
      VALUES($1, $2, $3, $4)
      returning *`;
    const values = [
      req.params.driverID,
      req.body.plate,
      req.body.posLat,
      req.body.posLong
    ];

    try {
      const { rows } = await db.db.query(text, values);
      return res.status(201).send({
        driver_id: rows[0].driver_id,
        plate: rows[0].plate,
        pos_lat: rows[0].pos_lat,
        pos_long: rows[0].pos_long
      });
    } catch(error) {
      return res.status(400).json({error: error});
    }
  },

  async get(req, res) {
    const text = 'SELECT * FROM driver WHERE driver_id = $1';
    try {
      const { rows } = await db.query(text, [req.params.driverID]);
      if (!rows[0]) {
        return res.status(404).json({error: 'driver not found'});
      }
      return res.status(200).json({
        driver_id: rows[0].driver_id,
        plate: rows[0].plate,
        pos_lat: rows[0].pos_lat,
        pos_long: rows[0].pos_long
      });
    } catch(error) {
      console.log(error)
      return res.status(400).json({error: error})
    }
  },

  async delete(req, res) {
    const query = 'DELETE FROM driver WHERE driver_id=$1 returning *';
    try {
      const { rows } = await db.query(findOneQuery, [req.params.taxiID]);
      if(!rows[0]) {
        return res.status(404).json({error: 'taxi not found'});
      }
      const values = [
        req.body.plate || rows[0].plate,
        req.body.name || rows[0].name,
        req.body.birthDate || rows[0].birth_date,
        req.params.driverID
      ];
      const response = await db.query(updateOneQuery, values);
      return res.status(200).json({
        driver_id: rows[0].driver_id,
        plate: rows[0].plate,
        pos_lat: rows[0].pos_lat,
        pos_long: rows[0].pos_long
      });
    } catch(err) {
      console.log(error)
      return res.status(400).json({error: error});
    }
  }
}

module.exports.Database  = Database;