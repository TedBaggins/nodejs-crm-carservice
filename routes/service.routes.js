const { authJwt } = require("../middleware");
const services = require("../controllers/service.controller.js");

module.exports = app => {
    app.use(function(req, res, next) {
        res.header(
          "Access-Control-Allow-Headers",
          "x-access-token, Origin, Content-Type, Accept"
        );
        next();
    });
  
    var router = require("express").Router();
  
    // Retrieve all services
    router.get("/", [authJwt.verifyToken, authJwt.isAdminOrManager], services.findAll);

    // Retrieve all services without limit
    router.get("/all", [authJwt.verifyToken, authJwt.isAdminOrManager], services.findAllWithoutLimit);

    // Retrieve services count
    router.get("/count", [authJwt.verifyToken, authJwt.isAdminOrManager], services.count);

    // Retrieve a single service with id
    router.get("/:id", [authJwt.verifyToken, authJwt.isAdminOrManager], services.findOne);

    // Create a new service
    router.post("/", [authJwt.verifyToken, authJwt.isAdmin], services.create);
  
    // Update a service with id
    router.put("/:id", [authJwt.verifyToken, authJwt.isAdmin], services.update);
  
    // Delete a service with id
    router.delete("/:id", [authJwt.verifyToken, authJwt.isAdmin], services.delete);
  
    app.use('/api/services', [authJwt.verifyToken, authJwt.isAdminOrManager], router);
};