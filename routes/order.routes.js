const { authJwt } = require("../middleware");
const orders = require("../controllers/order.controller.js");

module.exports = app => {
    app.use(function(req, res, next) {
        res.header(
          "Access-Control-Allow-Headers",
          "x-access-token, Origin, Content-Type, Accept"
        );
        next();
    });
  
    var router = require("express").Router();

    // Retrieve all orders with limit
    router.get("/", [authJwt.verifyToken, authJwt.isManagerOrMaster], orders.findAll);

    // Retrieve orders count
    router.get("/count", [authJwt.verifyToken, authJwt.isManagerOrMaster], orders.count);

    // Retrieve a single order with id
    router.get("/:id", [authJwt.verifyToken, authJwt.isManagerOrMaster], orders.findOne);

    // Create a new order
    router.post("/", [authJwt.verifyToken, authJwt.isManagerOrMaster], orders.create);
  
    // Update an order with id
    router.put("/:id", [authJwt.verifyToken, authJwt.isManagerOrMaster], orders.update);
  
    // Delete an order with id
    router.delete("/:id", [authJwt.verifyToken, authJwt.isManagerOrMaster], orders.delete);
  
    app.use('/api/orders', [authJwt.verifyToken, authJwt.isManagerOrMaster], router);
};