const { authJwt } = require("../middleware");
const admins = require("../controllers/admin.controller.js");

module.exports = app => {
    app.use(function(req, res, next) {
        res.header(
          "Access-Control-Allow-Headers",
          "x-access-token, Origin, Content-Type, Accept"
        );
        next();
    });
  
    var router = require("express").Router();
  
    // Retrieve all admins
    router.get("/all", [authJwt.verifyToken, authJwt.isAdmin], admins.findAllWithoutLimit);

    // Retrieve all admins with limit
    router.get("/", [authJwt.verifyToken, authJwt.isAdmin], admins.findAll);

    // Retrieve admins count
    router.get("/count", [authJwt.verifyToken, authJwt.isAdmin], admins.count);

    // Retrieve a single admin with id
    router.get("/:id", [authJwt.verifyToken, authJwt.isAdmin], admins.findOne);

    // Create a new admin
    router.post("/", [authJwt.verifyToken, authJwt.isAdmin], admins.create);
  
    // Update an admin with id
    router.put("/:id", [authJwt.verifyToken, authJwt.isAdmin], admins.update);
  
    // Delete an admin with id
    router.delete("/:id", [authJwt.verifyToken, authJwt.isAdmin], admins.delete);
  
    app.use('/api/admins', [authJwt.verifyToken, authJwt.isAdmin], router);
};