const vehicle = require("../database/controllers/driver.js")

module.exports.createTaxi = (req, res) => {
    return vehicle.Database.create(req, res);
}

module.exports.getTaxi = (req, res) => {
    return vehicle.Database.get(req, res);
}

module.exports.updateTaxi = (req, res) => {
    return vehicle.Database.update(req. res);
}
