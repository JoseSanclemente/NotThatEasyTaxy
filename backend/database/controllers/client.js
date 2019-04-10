var db = require('../db')

const Database = {
  async create(req, res) {
    const query = `INSERT INTO
          client(client_id, name, credit_card)
          VALUES($1, $2, $3)
          returning *`
    const values = [req.params.clientID, req.body.name, req.body.credit_card]

    try {
      const { rows } = await db.db.query(query, values)
      return res.status(200).json({
        client_id: rows[0].client_id,
        name: rows[0].name
      })
    } catch (error) {
      return res.status(400).json({ error: error })
    }
  },

  async update(req, res) {
    const getQuery = `SELECT * FROM client WHERE client_id = $1;`
    const query = `UPDATE client
                    SET name = $1, credit_card = $2
                    WHERE client_id = $3 returning *`

    try {
      const { rows } = await db.db.query(getQuery, [req.params.taxiID]);
      if(!rows[0]) {
        return res.status(404).json({error: 'client not found'});
      }
      const values = [
        req.body.name || rows[0].name,
        req.body.credit_card || rows[0].credit_card,
        req.params.clientID
      ];
      const { rows } = await db.db.query(query, values)
      return res.status(200).json({
        client_id: rows[0].client_id,
        name: rows[0].name
      })
    } catch (error) {
      return res.status(400).json({ error: error})
    }
  },

  async delete(req, res) {
    const query = `DELETE FROM client
                    WHERE client_id = $1 returning *;`
    const values = [req.params.clientID]

    try {
      const { rows } = await db.db.query(query, values)
      return res.status(200).json({
        client_id: rows[0].client_id,
        name: rows[0].name
      })
    } catch (error) {
      return res.status(400).json({error: error})
    }
  },

  async get(req, res) {
    const query = `SELECT * FROM client
                    WHERE client_id = $1;`
    const values = [req.params.clientID]

    try {
      const { rows } = await db.db.query(query, values)
      return res.status(200).json({
        client_id: rows[0].client_id,
        name: rows[0].name
      })
    } catch (error) {
      return res.status(400).json({ error: error })
    }
  }
}
