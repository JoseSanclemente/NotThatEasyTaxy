var db = require('../db')

const Database = {

  async create(req, res) {
    const loginQuery = 'INSERT INTO client_login(client_id, password) VALUES($1, $2)'
    const query = `INSERT INTO
      client(client_id, name, credit_card)
      VALUES($1, $2, $3) returning *`
    const values = [req.params.clientID, req.body.name, req.body.credit_card]

    try {
      const { rows } = await db.db.query(query, values)
      await db.db.query(loginQuery, [req.params.clientID, req.body.password])
      
      return res.status(200).json({
        client_id: rows[0].client_id,
        name: rows[0].name
      })
    } catch (error) {
      console.log(error)
      return res.status(400).json({ error: error })
    }
  },

  async update(req, res) {
    const getQuery = `SELECT * FROM client WHERE client_id=$1`
    const query = `UPDATE client
      YSET name=$1, credit_card=$2
      WHERE client_id=$3 returning *`

    try {
      const { rows } = await db.db.query(getQuery, [req.params.clientID])
      if(!rows[0]) {
        return res.status(404).json({error: 'client not found'})
      }

      const values = [
        req.body.name || rows[0].name,
        req.body.credit_card || rows[0].credit_card,
        req.params.clientID
      ];
      const response = await db.db.query(query, values)

      return res.status(200).json({
        client_id: response.rows[0].client_id,
        name: response.rows[0].name
      })
    } catch (error) {
      console.log(error)
      return res.status(400).json({ error: error})
    }
  },

  async delete(req, res) {
    const query = `DELETE FROM client
      WHERE client_id = $1 returning *`

    try {
      const { rows } = await db.db.query(query, [req.params.clientID])

      return res.status(200).json({
        client_id: rows[0].client_id,
        name: rows[0].name
      })
    } catch (error) {
      console.log(error)
      return res.status(400).json({error: error})
    }
  },

  async get(req, res) {
    const query = `SELECT * FROM client
      WHERE client_id = $1`

    try {
      const { rows } = await db.db.query(query, [req.params.clientID])

      return res.status(200).json({
        client_id: rows[0].client_id,
        name: rows[0].name
      })
    } catch (error) {
      console.log(error)
      return res.status(400).json({ error: error })
    }
  },

  async login(req, res) {
    const query = `SELECT * FROM client_login
      WHERE client_id = $1 AND password=$2`
    const values = [req.params.clientID, req.body.password]

    try {
      const { rows } = await db.db.query(query, values)
      if (!rows[0]) {
        return res.status(400).json({ error: "not found" })
      }

      return res.status(200).json({ message: "ok" })
    } catch (error) {
      console.log(error)
      return res.status(400).json({ error: error })
    }
  }
}

module.exports.Database  = Database