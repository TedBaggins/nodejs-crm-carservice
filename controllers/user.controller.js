const db = require("../models");
const User = db.user;
const Role = db.role;
const Admin = db.admin;
const Manager = db.manager;
const Master = db.master;
const Op = db.Sequelize.Op;
const { 
    v1: uuidv1,
    v4: uuidv4,
} = require('uuid');

// get all users
exports.findAll = (req, res) => {
    const limit = req.query.limit;
    const offset = req.query.offset;
    User.findAll({
        offset: offset,
        limit: limit,
        include: [{
                model: Role,
                required:false
            },
            {
                model: Admin,
                required:false
            },
            {
                model: Manager,
                required:false
            },
            {
                model: Master,
                required:false
            }
            ],
        attributes: {exclude: ['password']}
        })
        .then(data => {
            res.send(data);
        })
        .catch(err => {
            res.status(500).send({
                message: err.message
            });
        });
}

// get count of users
exports.count = (req, res) => {
    User.count()
        .then(data => {
            res.send({count: data});
        })
        .catch(err => {
            console.log(err);
            res.status(500).send({
                message: err.message
            });
        });
}

// get user by id
exports.findOne = (req, res) => {
    const id = req.params.id;
    User.findByPk(id)
        .then(data => {
            res.send(data);
        })
        .catch(err => {
            res.status(500).send({
                message: err.message
            });
        });
}

// remove user by id
exports.delete = (req, res) => {
    const id = req.params.id;

    User.destroy({
        where: { id: id }
    })
    .then(num => {
        if (num == 1) {
            res.send({
                message: "User was deleted successfully!"
            });
        } else {
            res.send({
                message: `Cannot delete User with id=${id}. Maybe User was not found!`
            });
        }
    })
    .catch(err => {
        res.status(500).send({
            message: "Could not delete User with id=" + id
        });
    });
};

exports.adminBoard = (req, res) => {
    res.status(200).send("Admin Content.");
};
  
exports.managerBoard = (req, res) => {
    res.status(200).send("Manager Content.");
};
  
exports.masterBoard = (req, res) => {
    res.status(200).send("Master Content.");
};