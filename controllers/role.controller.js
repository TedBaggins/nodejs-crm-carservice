const db = require("../models");
const Role = db.role;
const Op = db.Sequelize.Op;

// get all roles
exports.findAllWithoutLimit = (req, res) => {
    Role.findAll()
        .then(data => {
            res.send(data);
        })
        .catch(err => {
            res.status(500).send({
                message: err.message
            });
        });
}