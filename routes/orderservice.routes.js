const { authJwt } = require("../middleware");
const ordersservices = require("../controllers/orderservice.controller.js");

module.exports = app => {
    app.use(function(req, res, next) {
        res.header(
          "Access-Control-Allow-Headers",
          "x-access-token, Origin, Content-Type, Accept"
        );
        next();
    });
  
    var router = require("express").Router();

    // Create a new service
    router.post("/", [authJwt.verifyToken, authJwt.isManager], ordersservices.create);
  
    // Delete a service with id
    router.delete("/:id", [authJwt.verifyToken, authJwt.isManager], ordersservices.delete);
  
    app.use('/api/ordersservices', [authJwt.verifyToken, authJwt.isManager], router);
};