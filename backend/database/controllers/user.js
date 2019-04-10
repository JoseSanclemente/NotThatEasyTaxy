var db = require('../db')

const Place = {
  async create(req, res) {
    const query = `INSERT INTO
          client(client_id, name, credit_card)
          VALUES($1, $2, $3)
          returning *`
    const values = [req.params.clientID, req.body.name, req.body.credit_card]

    try {
      const { rows } = await db.db.query(query, values)
      return res.status(201).send(rows[0])
    } catch (error) {
      return res.status(400).send({ error: error })
    }
  },

  async update(req, res) {
    const query = `UPDATE client
                    SET name = $2, credit_card = $3
                    WHERE client_id = $1`
    const values = [req.params.clientID, req.body.name, req.body.credit_card]

    try {
      const { rows } = await db.db.query(query, values)
      return res.status(201).send(rows[0])
    } catch (error) {
      return res.status(400).send({ error: error})
    }
  },

  async delete(req, res) {
    const query = `DELETE FROM client
                    WHERE client_id = $1;`
    const values = [req.params.clientID]

    try {
      const { rows } = await db.db.query(query, values)
      return res.status(201).send(rows[0])
    } catch (error) {
      return res.status(400).send({error: error})
    }
  },

  async get(req, res) {
    const query = `SELECT * FROM client
                    WHERE client_id = $1;`
    const values = [req.params.clientID]

    try {
      const { rows } = await db.db.query(query, values)
      return res.status(201).send(rows[0])
    } catch (error) {
      return res.status(400).send({ error: error })
    }
  }
}
