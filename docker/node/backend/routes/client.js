const client = require("../database/controllers/client.js")
const place = require("../database/controllers/place.js")
const actives = require("../database/controllers/active_driver.js")
const availableTrips = require("../database/controllers/available_trips.js")
const trip = require("../database/controllers/trip.js")

module.exports.loginClient = (req, res) => {
  return client.Database.login(req, res)
}

module.exports.createClient = (req, res) => {
  return client.Database.create(req, res)
}

module.exports.getClient = (req, res) => {
  return client.Database.get(req, res)
}

module.exports.updateClient = (req, res) => {
  return client.Database.update(req, res)
}

module.exports.getClientUnpaidTrips = (req, res) => {
  return trip.Database.getUnpaid(req, res)
}

module.exports.payClientTrips = (req, res) => {
  return trip.Database.pay(req, res)
}

module.exports.getNearbyDrivers = (req, res) => {
  return actives.Database.getNear(req, res)
}

module.exports.requestClientTrip = (req, res) => {
  return availableTrips.Database.create(req, res)
}

module.exports.checkPendingTrip = (req, res) => {
  return availableTrips.Database.check(req, res)
}

module.exports.scoreTrip = (req, res) => {
  return trip.Database.score(req, res)
}

module.exports.getClientPlaces = (req, res) => {
  return place.Database.getAll(req, res)
}

module.exports.addClientPlace = (req, res) => {
  return place.Database.create(req, res)
}

module.exports.deleteClientPlace = (req, res) => {
  return place.Database.delete(req, res)
}
