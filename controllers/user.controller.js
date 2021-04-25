const db = require("../models");
const User = db.user;
const Role = db.role;
const Admin = db.admin;
const Manager = db.manager;
const Master = db.master;
const Op = db.Sequelize.Op;
const bcrypt = require("bcryptjs");
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

// create and save new user
exports.create = (req, res) => {
    let { login, email, password, role_id, admin_id, manager_id, master_id } = req.body;
    if (!login) {
        res.status(400).send({
            message: "Login can not be empty"
        });
        return;
    }
    if (!password) {
        res.status(400).send({
            message: "Password can not be empty"
        });
        return;
    }
    if (!role_id) {
        res.status(400).send({
            message: "Role can not be empty"
        });
        return;
    }

    // check for duplicate login or email
    User.findOne({
        where: {
          login: login
        }
    })
    .then(user => {
        if (user) {
            res.status(400).send({
                code: "102",
                message: "Login is already in use"
            });
            return;
        }
        User.findOne({
            where: {
                email: email
            }
        })
        .then(user => {
            if (user) {
                res.status(400).send({
                    code: "103",
                    message: "Email is already in use"
                });
                return;
            }
        })
    });
    if (!admin_id) admin_id = null;
    if (!manager_id) manager_id = null;
    if (!master_id) master_id = null;
    const id = uuidv4();

    const user = {
        id: id,
        login: login,
        email: email,
        password: bcrypt.hashSync(password, 8),
        role_id: role_id,
        admin_id: admin_id,
        manager_id: manager_id,
        master_id: master_id
    }

    User.create(user)
        .then(data => {
            res.send(data);
        })
        .catch(err => {
            res.status(500).send({
                message: err.message
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