const { authJwt } = require("../middleware");
const masters = require("../controllers/master.controller.js");

module.exports = app => {
    app.use(function(req, res, next) {
        res.header(
          "Access-Control-Allow-Headers",
          "x-access-token, Origin, Content-Type, Accept"
        );
        next();
    });
  
    var router = require("express").Router();
  
    // Retrieve all masters
    router.get("/all", [authJwt.verifyToken, authJwt.isAdmin], masters.findAllWithoutLimit);

    // Retrieve all masters with limit
    router.get("/", [authJwt.verifyToken, authJwt.isAdmin], masters.findAll);

    // Retrieve masters count
    router.get("/count", [authJwt.verifyToken, authJwt.isAdmin], masters.count);

    // Retrieve a single master with id
    router.get("/:id", [authJwt.verifyToken, authJwt.isAdmin], masters.findOne);

    // Create a new master
    router.post("/", [authJwt.verifyToken, authJwt.isAdmin], masters.create);
  
    // Update a master with id
    router.put("/:id", [authJwt.verifyToken, authJwt.isAdmin], masters.update);
  
    // Delete a master with id
    router.delete("/:id", [authJwt.verifyToken, authJwt.isAdmin], masters.delete);
  
    app.use('/api/masters', [authJwt.verifyToken, authJwt.isAdmin], router);
};