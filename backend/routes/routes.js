var driver = require("./driver.js")//.default.default.default.default
const vehicle = require("./vehicle.js")
const user = require("./user.js")

var appRouter = function (app) {
    app.post("/api/driver/:driverID", function(req, res){driver.createDriver});
    app.get("/api/driver/:driverID", driver.getDriver);
    app.put("/api/driver/:driverID", function(req, res){driver.updateDriver});
    app.post("/api/driver/:driverID/changeStatus", function(req, res){driver.changeDriverStatus});
    app.get("/api/driver/:driverID/getPendingTrips", function(req, res){driver.getDriverPendingTrips});
    app.post("/api/driver/:driverID/doTrip", function(req, res){driver.acceptDriverTrip});
    app.get("/api/driver/:driverID/getTrips", function(req, res){driver.getDriverUnpaidTrips});
    app.post("/api/driver/:driverID/chargeTrips", function(req, res){driver.payDriverTrips});

    app.post("/api/vehicle/:vehicleID", function(req, res){vehicle.createVehicle});
    app.get("/api/vehicle/:vehicleID", function(req, res){vehicle.getVehicle});
    app.put("/api/vehicle/:vehicleID", function(req, res){vehicle.updateVehicle});

    app.post("/api/user/:userID", function(req, res){user.createUser});
    app.get("/api/user/:userID", function(req, res){user.getUser});
    app.put("/api/user/:userID", function(req, res){user.updateUser});
    app.get("/api/user/:userID/getTrips", function(req, res){user.getUserUnpaidTrips});
    app.post("/api/user/:userID/payTrips", function(req, res){user.payUserTrips});
    app.get("/api/user/:userID/getNearbyDrivers", function(req, res){user.getNearbyDrivers});
    app.post("/api/user/:userID/doTrip", function(req, res){user.requestUserTrip});
    app.get("/api/user/:userID/getPlaces", function(req, res){user.getUserPlaces});
    app.post("/api/user/:userID/addPlace", function(req, res){user.addUserPlace});
    app.delete("/api/user/:userID/removePlace", function(req, res){user.deleteUserPlace});

    /* app.get("/url", (req, res, next) => {
        res.json(["Tony","Lisa","Michael","Ginger","Food"]);
    }); */
}
  
module.exports = appRouter;