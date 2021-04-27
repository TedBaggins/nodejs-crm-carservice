const jwt = require("jsonwebtoken");
const config = require("../config/auth.config.js");
const db = require("../models");
const User = db.user;
const Role = db.role;

verifyToken = (req, res, next) => {
    let token = req.headers["x-access-token"];
  
    if (!token) {
        return res.status(403).send({
            message: "No token provided!"
        });
    }
  
    jwt.verify(token, config.secret, (err, decoded) => {
        if (err) {
            return res.status(401).send({
            message: "Unauthorized!"
            });
        }
        req.userId = decoded.id;
        next();
    });
};

isAdmin = (req, res, next) => {
    User.findByPk(req.userId).then(user => {
        Role.findByPk(user.role_id).then(role => {
            if (role.name === 'admin') {
                next();
                return;
            }
            res.status(403).send({
                message: "Require Admin Role!"
            });
            return;
        });
    });
};

isManager = (req, res, next) => {
    User.findByPk(req.userId).then(user => {
        Role.findByPk(user.role_id).then(role => {
            if (role.name === 'manager') {
                next();
                return;
            }
            res.status(403).send({
                message: "Require Manager Role!"
            });
            return;
        });
    });
};

isMaster = (req, res, next) => {
    User.findByPk(req.userId).then(user => {
        Role.findByPk(user.role_id).then(role => {
            if (role.name === 'master') {
                next();
                return;
            }
            res.status(403).send({
                message: "Require Master Role!"
            });
            return;
        });
    });
};

isAdminOrManager = (req, res, next) => {
    User.findByPk(req.userId).then(user => {
        Role.findByPk(user.role_id).then(role => {
            if (role.name === 'admin' || role.name === 'manager') {
                next();
                return;
            }
            res.status(403).send({
                message: "Require Admin or Manager Role!"
            });
            return;
        });
    });
};

isManagerOrMaster = (req, res, next) => {
    User.findByPk(req.userId).then(user => {
        Role.findByPk(user.role_id).then(role => {
            if (role.name === 'manager' || role.name === 'master') {
                next();
                return;
            }
            res.status(403).send({
                message: "Require Manager or Master Role!"
            });
            return;
        });
    });
};

const authJwt = {
    verifyToken: verifyToken,
    isAdmin: isAdmin,
    isManager: isManager,
    isMaster: isMaster,
    isManagerOrMaster: isManagerOrMaster,
    isAdminOrManager: isAdminOrManager
};
module.exports = authJwt;