var db = require('../db')

const Database = {

  async create(req, res) {
    const query = `INSERT INTO
      place(name, client_id, pos_lat, pos_long)
      VALUES($1, $2, $3, $4) returning *`
    const values = [req.body.name, req.params.clientID, req.body.pos_lat, req.body.pos_long]

    try {
      const { rows } = await db.db.query(query, values)
      return res.status(200).json(rows[0])
    } catch (error) {
      console.log(error)
      return res.status(400).json({ error: error })
    }
  },

  async delete(req, res) {
    const query = `DELETE FROM place
      WHERE client_id = $1 AND name = $2 returning *`
    const values = [req.params.clientID, req.query.name]

    try {
      const { rows } = await db.db.query(query, values)
      return res.status(200).json({ message: "ok"})
    } catch (error) {
      console.log(error)
      return res.status(400).json({ error: error })
    }
  },

  async getAll(req, res) {
    const query = `SELECT * FROM place
      WHERE client_id = $1`

    try {
      const { rows } = await db.db.query(query, [req.params.clientID])

      var places = []
      rows.forEach(place => {
        places.push({
          client_id: place.client_id,
          name: place.name,
          pos_lat: place.pos_lat,
          pos_long: place.pos_long
        })
      })

      return res.status(200).json(places)
    } catch (error) {
      console.log(error)
      return res.status(400).json({ error: error })
    }
  }
}

module.exports.Database  = Database