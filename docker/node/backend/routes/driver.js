const driver = require("../database/controllers/driver.js")
const actives = require("../database/controllers/active_driver.js")
const availableTrips = require("../database/controllers/available_trips.js")
const trip = require("../database/controllers/trip.js")

module.exports.createDriver = (req, res) => {
    return driver.Database.create(req, res)
}

module.exports.getDriver = (req, res) => {
    return driver.Database.login(req, res)
}

module.exports.updateDriver = (req, res) => {
    return driver.Database.update(req, res)
}

module.exports.changeDriverStatus = (req, res) => {
    if (req.body.status) {
        return actives.Database.create(req, res)
    }
    return actives.Database.delete(req, res)
}

module.exports.getDriverPendingTrips = (req, res) => {
    return availableTrips.Database.getDriverTrips(req, res)
}

module.exports.acceptDriverTrip = (req, res) => {
    return trip.Database.create(req, res)
}

module.exports.getDriverUnpaidTrips = (req, res) => {
    return trip.Database.getUnpaid(req, res)
}

module.exports.payDriverTrips = (req, res) => {
    return trip.Database.pay(req, res)
}
