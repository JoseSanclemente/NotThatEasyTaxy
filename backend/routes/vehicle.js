var createVehicle = function(req, res) {
    return res.status(200).send("Requested info of the vehicle /${req.params.vehicleId}");
}

var getVehicle = function(req, res) {
    return res.status(200).send("Requested info of the vehicle /${req.params.vehicleId}");
}

var updateVehicle = function(req, res) {
    return res.status(200).send("Requested info of the vehicle /${req.params.vehicleId}");
}

module.exports = createVehicle;
module.exports = getVehicle;
module.exports = updateVehicle;