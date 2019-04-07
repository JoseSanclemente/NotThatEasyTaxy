module.exports.createDriver = (req, res) => {
    return res.send("Requested info of the driver /${req.params.driverId}");
}

module.exports.getDriver = (req, res) => {
    console.log(req.body)
    return res.status(200).send("Requested info of the driver /${req.params.driverId}");
};

module.exports.updateDriver = (req, res) => {
    return res.send("Requested info of the driver /${req.params.driverId}");
}

module.exports.changeDriverStatus = (req, res) => {
    return res.send("Requested /${req.query.limit} drivers starting from /${req.query.offset}");
}

module.exports.getDriverPendingTrips = (req, res) => {
    return res.send("Requested info of the driver /${req.params.driverId}");
}

module.exports.acceptDriverTrip = (req, res) => {
    return res.send("Requested info of the driver /${req.params.driverId}");
}

module.exports.getDriverUnpaidTrips = (req, res) => {
    return res.send("Requested info of the driver /${req.params.driverId}");
}

module.exports.payDriverTrips = (req, res) => {
    return res.send("Requested info of the driver /${req.params.driverId}");
}
