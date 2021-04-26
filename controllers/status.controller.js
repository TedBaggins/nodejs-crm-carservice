const db = require("../models");
const Status = db.status;
const Op = db.Sequelize.Op;

// get all order statuses
exports.findAllWithoutLimit = (req, res) => {
    Status.findAll()
        .then(data => {
            res.send(data);
        })
        .catch(err => {
            res.status(500).send({
                message: err.message
            });
        });
}