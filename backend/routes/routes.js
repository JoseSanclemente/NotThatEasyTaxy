const driver = require("./driver.js")
const vehicle = require("./taxi.js")
const client = require("./client.js")

var appRouter = function (app) {
    app.post("/api/driver/:driverID", driver.createDriver);
    app.get("/api/driver/:driverID", driver.getDriver);
    app.put("/api/driver/:driverID", driver.updateDriver);
    app.post("/api/driver/:driverID/changeStatus", driver.changeDriverStatus);
    app.get("/api/driver/:driverID/getPendingTrips", driver.getDriverPendingTrips);
    app.post("/api/driver/:driverID/doTrip", driver.acceptDriverTrip);
    app.get("/api/driver/:driverID/getTrips", driver.getDriverUnpaidTrips);
    app.post("/api/driver/:driverID/chargeTrips", driver.payDriverTrips);

    app.post("/api/taxi/:taxiID", vehicle.createTaxi);
    app.get("/api/taxi/:taxiID", vehicle.getTaxi);
    app.put("/api/taxi/:taxiID", vehicle.updateTaxi);

    app.post("/api/client/:clientID", client.createClient);
    app.get("/api/client/:clientID", client.getClient);
    app.put("/api/client/:clientID", client.updateClient);
    app.get("/api/client/:clientID/getTrips", client.getClientUnpaidTrips);
    app.post("/api/client/:clientID/payTrips", client.payClientTrips);
    app.get("/api/client/:clientID/getNearbyDrivers", client.getNearbyDrivers);
    app.post("/api/client/:clientID/doTrip", client.requestClientTrip);
    app.get("/api/client/:clientID/getPlaces", client.getClientPlaces);
    app.post("/api/client/:clientID/addPlace", client.addClientPlace);
    app.delete("/api/client/:clientID/removePlace", client.deleteClientPlace);
}

module.exports = appRouter;