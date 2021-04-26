const { authJwt } = require("../middleware");
const cars = require("../controllers/car.controller.js");

module.exports = app => {
    app.use(function(req, res, next) {
        res.header(
          "Access-Control-Allow-Headers",
          "x-access-token, Origin, Content-Type, Accept"
        );
        next();
    });
  
    var router = require("express").Router();
  
    // Retrieve all cars
    router.get("/all", [authJwt.verifyToken, authJwt.isManagerOrMaster], cars.findAllWithoutLimit);

    // Retrieve all client cars
    router.get("/client/:clientid", [authJwt.verifyToken, authJwt.isManagerOrMaster], cars.findClientCars);

    // Retrieve all cars with limit
    router.get("/", [authJwt.verifyToken, authJwt.isManagerOrMaster], cars.findAll);

    // Retrieve a single car with id
    router.get("/:id", [authJwt.verifyToken, authJwt.isManagerOrMaster], cars.findOne);

    // Create a new car
    router.post("/", [authJwt.verifyToken, authJwt.isManagerOrMaster], cars.create);
  
    // Update a car with id
    router.put("/:id", [authJwt.verifyToken, authJwt.isManagerOrMaster], cars.update);
  
    // Delete a car with id
    router.delete("/:id", [authJwt.verifyToken, authJwt.isManagerOrMaster], cars.delete);
  
    app.use('/api/cars', [authJwt.verifyToken, authJwt.isManagerOrMaster], router);
};