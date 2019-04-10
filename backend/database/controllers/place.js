var db = require('../db')

const Place = {
  async create(req, res) {
    const query = `INSERT INTO
          place(name, client_id, pos_lat, pos_long)
            VALUES($1, $2, $3, $4)
            returning *`
    const values = [req.params.name, req.params.clientID, req.body.pos_lat, req.body.pos_long]

    try {
      const { rows } = await db.db.query(query, values)
      return res.status(201).send(rows[0])
    } catch (error) {
      return res.status(400).send({ error: error })
    }
  },

  async delete(req, res) {
    const query = `DELETE FROM place
                    WHERE client_id = $1 AND name = $2;`
    const values = [req.params.clientID, req.params.name]

    try {
      const { rows } = await db.db.query(query, values)
      return res.status(201).send(rows[0])
    } catch (error) {
      return res.status(400).send({ error: error })
    }
  },

  async get(req, res) {
    const query = `SELECT * FROM client
                    WHERE client_id = $1 AND name = $2;`
    const values = [req.params.clientID, req.params.name]

    try {
      const { rows } = await db.db.query(query, values)
      return res.status(201).send(rows[0])
    } catch (error) {
      return res.status(400).send({ error: error })
    }
  }
}
