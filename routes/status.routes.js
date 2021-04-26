const { authJwt } = require("../middleware");
const statuses = require("../controllers/status.controller.js");

module.exports = app => {
    app.use(function(req, res, next) {
        res.header(
          "Access-Control-Allow-Headers",
          "x-access-token, Origin, Content-Type, Accept"
        );
        next();
    });
  
    var router = require("express").Router();
  
    // Retrieve all order statuses
    router.get("/all", [authJwt.verifyToken, authJwt.isManagerOrMaster], statuses.findAllWithoutLimit);
  
    app.use('/api/statuses', [authJwt.verifyToken, authJwt.isManagerOrMaster], router);
};