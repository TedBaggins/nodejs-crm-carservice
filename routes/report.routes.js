const { authJwt } = require("../middleware");
const reports = require("../controllers/report.controller.js");

module.exports = app => {
    app.use(function(req, res, next) {
        res.header(
          "Access-Control-Allow-Headers",
          "x-access-token, Origin, Content-Type, Accept"
        );
        next();
    });
  
    var router = require("express").Router();

    // Create a new report
    router.post("/", [authJwt.verifyToken, authJwt.isMaster], reports.create);
  
    // Update an report with id
    router.put("/:id", [authJwt.verifyToken, authJwt.isMaster], reports.update);
  
    // Delete an report with id
    router.delete("/:id", [authJwt.verifyToken, authJwt.isMaster], reports.delete);
  
    app.use('/api/reports', [authJwt.verifyToken, authJwt.isMaster], router);
};