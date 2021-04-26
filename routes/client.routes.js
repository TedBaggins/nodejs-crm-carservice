const { authJwt } = require("../middleware");
const clients = require("../controllers/client.controller.js");

module.exports = app => {
    app.use(function(req, res, next) {
        res.header(
          "Access-Control-Allow-Headers",
          "x-access-token, Origin, Content-Type, Accept"
        );
        next();
    });
  
    var router = require("express").Router();
  
    // Retrieve all clients
    router.get("/all", [authJwt.verifyToken, authJwt.isManagerOrMaster], clients.findAllWithoutLimit);

    // Retrieve all clients with limit
    router.get("/", [authJwt.verifyToken, authJwt.isManagerOrMaster], clients.findAll);

    // Retrieve clients count
    router.get("/count", [authJwt.verifyToken, authJwt.isManagerOrMaster], clients.count);

    // Retrieve a single client with id
    router.get("/:id", [authJwt.verifyToken, authJwt.isManagerOrMaster], clients.findOne);

    // Create a new client
    router.post("/", [authJwt.verifyToken, authJwt.isManagerOrMaster], clients.create);
  
    // Update a client with id
    router.put("/:id", [authJwt.verifyToken, authJwt.isManagerOrMaster], clients.update);
  
    // Delete a client with id
    router.delete("/:id", [authJwt.verifyToken, authJwt.isManagerOrMaster], clients.delete);
  
    app.use('/api/clients', [authJwt.verifyToken, authJwt.isManagerOrMaster], router);
};