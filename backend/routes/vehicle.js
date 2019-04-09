const vehicle = require("../database/controllers/driver.js")

module.exports.createVehicle = (req, res) => {
    return vehicle.Database.create(req, res)
    //return res.status(200).send("Requested info of the vehicle /${req.params.vehicleId}");
}

module.exports.getVehicle = (req, res) => {
    return res.status(200).send("Requested info of the vehicle /${req.params.vehicleId}");
}

module.exports.updateVehicle = (req, res) => {
    return res.status(200).send("Requested info of the vehicle /${req.params.vehicleId}");
}
