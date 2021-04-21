const db = require("../models");
const config = require("../config/auth.config");
let jwt = require("jsonwebtoken");
let bcrypt = require("bcryptjs");

const User = db.user;
const Role = db.role;
const Admin = db.admin;
const Manager = db.manager;
const Master = db.master;
const Op = db.Sequelize.Op;

exports.signin = (req, res) => {
    //const {login, password} = req.body;

    User.findOne({
        where: {
            login: req.body.login
        }
    })
    .then(user => {
        if (!user) {
            return res.status(404).send({ message: "User Not found." });
        }
        let passwordIsValid = bcrypt.compareSync(
            req.body.password,
            user.password
        );
        if (!passwordIsValid) {
            return res.status(401).send({
                accessToken: null,
                message: "Invalid Password!"
            });
        }
        let token = jwt.sign({ id: user.id }, config.secret, {
            expiresIn: 86400 // 24 hours
        });

        Role.findByPk(user.role_id).then(role => {
            switch(role.name) {
                case 'admin':
                    Admin.findByPk(user.admin_id).then(admin => {
                        res.status(200).send({
                            id: user.id,
                            login: user.login,
                            email: user.email,
                            role: role.name,
                            accessToken: token,
                            profile: admin
                        });
                    });
                    break;
                case 'manager': 
                    Manager.findByPk(user.manager_id).then(manager => {
                        res.status(200).send({
                            id: user.id,
                            login: user.login,
                            email: user.email,
                            role: role.name,
                            accessToken: token,
                            profile: manager
                        });
                    });
                    break;
                case 'master': 
                    Master.findByPk(user.master_id).then(master => {
                        res.status(200).send({
                            id: user.id,
                            login: user.login,
                            email: user.email,
                            role: role.name,
                            accessToken: token,
                            profile: master
                        });
                    });
                    break;
                default:
                    res.status(400).send({ message: "User role not found" });
            }
        });
    })
    .catch(err => {
        res.status(500).send({ message: err.message });
    });
};