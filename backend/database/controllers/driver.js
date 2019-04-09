
var db = require('../db');

const Database = {
  async create(req, res) {
    const text = `INSERT INTO
      taxi(plate, model, soat, trunk, brand)
      VALUES($1, $2, $3, $4, $5)
      returning *`;
    const values = [
      "asdsa",
      "asdsadad",
      "soat",
      true,
      "brand"
    ];

    try {
      //db.pool.connect()
      const { rows } = await db.db.query(text, values);
      return res.status(201).send(rows[0]);
    } catch(error) {
      return res.status(400).send(error);
    }
  },

  /* async getAll(req, res) {
    const findAllQuery = 'SELECT * FROM reflections';
    try {
      const { rows, rowCount } = await db.query(findAllQuery);
      return res.status(200).send({ rows, rowCount });
    } catch(error) {
      return res.status(400).send(error);
    }
  },

  async getOne(req, res) {
    const text = 'SELECT * FROM reflections WHERE id = $1';
    try {
      const { rows } = await db.query(text, [req.params.id]);
      if (!rows[0]) {
        return res.status(404).send({'message': 'reflection not found'});
      }
      return res.status(200).send(rows[0]);
    } catch(error) {
      return res.status(400).send(error)
    }
  },

  async update(req, res) {
    const findOneQuery = 'SELECT * FROM reflections WHERE id=$1';
    const updateOneQuery =`UPDATE reflections
      SET success=$1,low_point=$2,take_away=$3,modified_date=$4
      WHERE id=$5 returning *`;
    try {
      const { rows } = await db.query(findOneQuery, [req.params.id]);
      if(!rows[0]) {
        return res.status(404).send({'message': 'reflection not found'});
      }
      const values = [
        req.body.success || rows[0].success,
        req.body.low_point || rows[0].low_point,
        req.body.take_away || rows[0].take_away,
        moment(new Date()),
        req.params.id
      ];
      const response = await db.query(updateOneQuery, values);
      return res.status(200).send(response.rows[0]);
    } catch(err) {
      return res.status(400).send(err);
    }
  },

  async delete(req, res) {
    const deleteQuery = 'DELETE FROM reflections WHERE id=$1 returning *';
    try {
      const { rows } = await db.query(deleteQuery, [req.params.id]);
      if(!rows[0]) {
        return res.status(404).send({'message': 'reflection not found'});
      }
      return res.status(204).send({ 'message': 'deleted' });
    } catch(error) {
      return res.status(400).send(error);
    }
  } */
}

module.exports.Database  = Database;