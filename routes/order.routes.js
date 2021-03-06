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

    // Retrieve all orders whose status is different from "created"
    router.get("/submitted", [authJwt.verifyToken, authJwt.isManagerOrMaster], orders.findAllSubmitted);

    // Retrieve orders count
    router.get("/count", [authJwt.verifyToken, authJwt.isManagerOrMaster], orders.count);

    // Retrieve orders count whose status is different from "created"
    router.get("/count/submitted", [authJwt.verifyToken, authJwt.isManagerOrMaster], orders.countSubmitted);

    // Retrieve a single order with id
    router.get("/:id", [authJwt.verifyToken, authJwt.isManagerOrMaster], orders.findOne);

    // Create a new order
    router.post("/", [authJwt.verifyToken, authJwt.isManagerOrMaster], orders.create);
  
    // Update an order with id
    router.put("/:id", [authJwt.verifyToken, authJwt.isManagerOrMaster], orders.update);
  
    // Delete an order with id
    router.delete("/:id", [authJwt.verifyToken, authJwt.isManagerOrMaster], orders.delete);

    // change order status
    router.put("/:id/changestatus", [authJwt.verifyToken, authJwt.isManagerOrMaster], orders.changeStatus);
  
    app.use('/api/orders', [authJwt.verifyToken, authJwt.isManagerOrMaster], router);
};