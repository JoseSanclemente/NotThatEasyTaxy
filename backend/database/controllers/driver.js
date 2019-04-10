var db = require('../db');

const Database = {
  async create(req, res) {
    const loginQuery = 'INSERT INTO driver_login(driver_id, password)'
    const text = `INSERT INTO
      driver(driver_id, plate, name, birth_date)
      VALUES($1, $2, $3, $4)
      returning *`;
    const values = [
      req.params.driverID,
      req.body.plate,
      req.body.name,
      req.body.birthDate
    ];

    try {
      const { rows } = await db.db.query(text, values);
      await db.db.query(loginQuery, [req.params.driverID, req.body.password])
      return res.status(201).json({
        driver_id: rows[0].driver_id,
        taxi_id: rows[0].taxi_id,
        name: rows[0].name,
        birth_date: rows[0].birth_date
      });
    } catch(error) {
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
        name: rows[0].name,
        birth_date: rows[0].birth_date
      });
    } catch(error) {
      console.log(error)
      return res.status(400).json({error: error})
    }
  },

  async update(req, res) {
    const findOneQuery = 'SELECT * FROM driver WHERE driver_id=$1';
    const updateOneQuery =`UPDATE driver
      SET plate=$1, name=$2, birth_date=$3
      WHERE driver_id=$4 returning *`;
    try {
      const { rows } = await db.db.query(findOneQuery, [req.params.taxiID]);
      if(!rows[0]) {
        return res.status(404).json({error: 'taxi not found'});
      }
      const values = [
        req.body.taxiID || rows[0].taxi_id,
        req.body.name || rows[0].name,
        req.body.birthDate || rows[0].birth_date,
        req.params.driverID
      ];
      const response = await db.db.query(updateOneQuery, values);
      return res.status(200).json({
        driver_id: rows[0].driver_id,
        taxi_id: rows[0].taxi_id,
        name: rows[0].name,
        birth_date: rows[0].birth_date
      });
    } catch(err) {
      console.log(error)
      return res.status(400).json({error: error});
    }
  },

  async login(req, res) {
    const query = `SELECT * FROM driver_login
                    WHERE driver_id = $1 AND password=$2;`
    const values = [req.params.driverID, req.body.password]

    try {
      const { rows } = await db.db.query(query, values)
      if (!rows[0]) {
        return res.status(400).json({ error: "not found" })
      }
      return res.status(200).json({ message: "ok" })
    } catch (error) {
      return res.status(400).json({ error: error })
    }
  }
}

module.exports.Database  = Database;