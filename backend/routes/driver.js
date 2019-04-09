module.exports.createDriver = (req, res) => {
    // createDriver(req.params.driverID, req.body)
    result = {
        message: "ok",
    }

    if (result.error != undefined) {
        return res.status(400).json(result)
    }

    return res.status(200).json(result)
}

module.exports.getDriver = (req, res) => {
    console.log(req.body)
    console.log(req.body.hola)
    console.log(req.params.driverID)
    // getDriver(req.params.driverID, req.body)
    result = {
        driver: [
            {
                id: 123,
                nombre: "juan",
            },
            {
                id: 123,
                nombre: "camilo",
            },
        ],
    }

    if (result.error != undefined) {
        return res.status(400).json(result)
    }

    return res.status(200).json(result);
};

module.exports.updateDriver = (req, res) => {
    // updateDriver(req.params.driverID, req.body)
    result = {
        message: "ok",
    }

    if (result.error != undefined) {
        return res.status(400).json(result)
    }

    return res.status(200).json(result)
}

module.exports.changeDriverStatus = (req, res) => {
    // driver = getDriver(req.params.driverID)
    // result changeDriverStatus(req.params.driverID, driver.vehicleID, res.body.posLat, res.body.postLon)
    result = {
        message: "ok",
    }

    if (result.error != undefined) {
        return res.status(400).json(result)
    }

    return res.status(200).json(result)
}

module.exports.getDriverPendingTrips = (req, res) => {
    // getDriverPendingTrips(req.params.driverID)
    result = {
        driver: [
            {
                id: 123,
                nombre: "juan",
            },
            {
                id: 123,
                nombre: "camilo",
            },
        ],
    }

    if (result.error != undefined) {
        return res.status(400).json(result)
    }

    return res.status(200).json(result)
}

module.exports.acceptDriverTrip = (req, res) => {
    return res.send("Requested info of the driver /${req.params.driverId}");
}

module.exports.getDriverUnpaidTrips = (req, res) => {
    return res.send("Requested info of the driver /${req.params.driverId}");
}

module.exports.payDriverTrips = (req, res) => {
    // payDriverTrips
    return res.send("Requested info of the driver /${req.params.driverId}");
}
