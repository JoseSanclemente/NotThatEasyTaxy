const taxi = require("../database/controllers/taxi.js")

module.exports.createTaxi = (req, res) => {
    return taxi.Database.create(req, res);
}

module.exports.getTaxi = (req, res) => {
    return taxi.Database.get(req, res);
}

module.exports.updateTaxi = (req, res) => {
    return taxi.Database.update(req, res);
}
