const db = require("../models");
const Admin = db.admins;
const Op = db.Sequelize.Op;
const { 
    v1: uuidv1,
    v4: uuidv4,
} = require('uuid');

// get all admins
exports.findAll = (req, res) => {
    Admin.findAll()
        .then(data => {
            res.send(data);
        })
        .catch(err => {
            res.status(500).send({
                message: err.message
            });
        });
}

// get admin by id
exports.findOne = (req, res) => {
    const id = req.params.id;
    Admin.findByPk(id)
        .then(data => {
            res.send(data);
        })
        .catch(err => {
            res.status(500).send({
                message: err.message
            });
        });
}

// create and save new admin
exports.create = (req, res) => {
    const { fio, birthday, phone } = req.body;
    if (!fio) {
        res.status(400).send({
            message: "Fio can not be empty"
        });
        return;
    }

    const id = uuidv4();
    const admin = {
        id: id,
        fio: fio,
        birthday: birthday,
        phone: phone
    }
    Admin.create(admin)
        .then(data => {
            res.send(data);
        })
        .catch(err => {
            res.status(500).send({
                message: err.message
            });
        });
};

// update admin by id
exports.update = (req, res) => {
    const id = req.params.id;
    Admin.update(req.body, {
        where: {id: id}
    }).then(num => {
        if (num == 1) {
            res.send({
                message: "Admin was updated successfully."
            });
        } else {
            res.send({
                message: `Cannot update Admin with id=${id}. Maybe Admin was not found or req.body is empty!`
            });
        }
    })
    .catch(err => {
        res.status(500).send({
            message: "Error updating Admin with id=" + id
        });
    });
};

// remove admin by id
exports.delete = (req, res) => {
    const id = req.params.id;

    Admin.destroy({
        where: { id: id }
    })
    .then(num => {
        if (num == 1) {
            res.send({
                message: "Admin was deleted successfully!"
            });
        } else {
            res.send({
                message: `Cannot delete Admin with id=${id}. Maybe Admin was not found!`
            });
        }
    })
    .catch(err => {
        res.status(500).send({
            message: "Could not delete Admin with id=" + id
        });
    });
};