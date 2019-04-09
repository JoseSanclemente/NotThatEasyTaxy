const driver = require("./driver.js")
const vehicle = require("./vehicle.js")
const user = require("./user.js")

var appRouter = function (app) {
    app.post("/api/driver/:driverID", driver.createDriver);
    app.get("/api/driver/:driverID", driver.getDriver);
    app.put("/api/driver/:driverID", driver.updateDriver);
    app.post("/api/driver/:driverID/changeStatus", driver.changeDriverStatus);
    app.get("/api/driver/:driverID/getPendingTrips", driver.getDriverPendingTrips);
    app.post("/api/driver/:driverID/doTrip", driver.acceptDriverTrip);
    app.get("/api/driver/:driverID/getTrips", driver.getDriverUnpaidTrips);
    app.post("/api/driver/:driverID/chargeTrips", driver.payDriverTrips);

    app.post("/api/vehicle/:vehicleID", vehicle.createVehicle);
    app.get("/api/vehicle/:vehicleID", vehicle.getVehicle);
    app.put("/api/vehicle/:vehicleID", vehicle.updateVehicle);

    app.post("/api/user/:userID", user.createUser);
    app.get("/api/user/:userID", user.getUser);
    app.put("/api/user/:userID", user.updateUser);
    app.get("/api/user/:userID/getTrips", user.getUserUnpaidTrips);
    app.post("/api/user/:userID/payTrips", user.payUserTrips);
    app.get("/api/user/:userID/getNearbyDrivers", user.getNearbyDrivers);
    app.post("/api/user/:userID/doTrip", user.requestUserTrip);
    app.get("/api/user/:userID/getPlaces", user.getUserPlaces);
    app.post("/api/user/:userID/addPlace", user.addUserPlace);
    app.delete("/api/user/:userID/removePlace", user.deleteUserPlace);
}
  
module.exports = appRouter;