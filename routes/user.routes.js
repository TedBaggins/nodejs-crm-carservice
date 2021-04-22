const { authJwt } = require("../middleware");
const users = require("../controllers/user.controller");

module.exports = function(app) {
    app.use(function(req, res, next) {
        res.header(
          "Access-Control-Allow-Headers",
          "x-access-token, Origin, Content-Type, Accept"
        );
        next();
    });

    app.get(
        "/api/test/admin",
        [authJwt.verifyToken, authJwt.isAdmin],
        users.adminBoard
    );
    
    app.get(
        "/api/test/manager",
        [authJwt.verifyToken, authJwt.isManager],
        users.managerBoard
    );
    
    app.get(
        "/api/test/master",
        [authJwt.verifyToken, authJwt.isMaster],
        users.masterBoard
    );

    var router = require("express").Router();

    // Retrieve all users
    router.get("/", [authJwt.verifyToken, authJwt.isAdmin], users.findAll);

    // Retrieve users count
    router.get("/count", [authJwt.verifyToken, authJwt.isAdmin], users.count);

    // Retrieve a single user with id
    router.get("/:id", [authJwt.verifyToken, authJwt.isAdmin], users.findOne);

    // Delete a user with id
    router.delete("/:id", [authJwt.verifyToken, authJwt.isAdmin], users.delete);

    app.use('/api/users', [authJwt.verifyToken, authJwt.isAdmin], router);
};