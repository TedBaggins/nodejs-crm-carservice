const { authJwt } = require("../middleware");
const managers = require("../controllers/manager.controller.js");

module.exports = app => {
    app.use(function(req, res, next) {
        res.header(
          "Access-Control-Allow-Headers",
          "x-access-token, Origin, Content-Type, Accept"
        );
        next();
    });
  
    var router = require("express").Router();
  
    // Retrieve all managers
    router.get("/all", [authJwt.verifyToken, authJwt.isAdmin], managers.findAllWithoutLimit);

    // Retrieve all managers with limit
    router.get("/", [authJwt.verifyToken, authJwt.isAdmin], managers.findAll);

    // Retrieve managers count
    router.get("/count", [authJwt.verifyToken, authJwt.isAdmin], managers.count);

    // Retrieve a single manager with id
    router.get("/:id", [authJwt.verifyToken, authJwt.isAdmin], managers.findOne);

    // Create a new manager
    router.post("/", [authJwt.verifyToken, authJwt.isAdmin], managers.create);
  
    // Update a manager with id
    router.put("/:id", [authJwt.verifyToken, authJwt.isAdmin], managers.update);
  
    // Delete a manager with id
    router.delete("/:id", [authJwt.verifyToken, authJwt.isAdmin], managers.delete);
  
    app.use('/api/managers', [authJwt.verifyToken, authJwt.isAdmin], router);
};