const db = require("../models");
const Client = db.client;
const Car = db.car;
const Order = db.order;
const Op = db.Sequelize.Op;
const { 
    v1: uuidv1,
    v4: uuidv4,
} = require('uuid');

// get all clients 
exports.findAllWithoutLimit = (req, res) => {
    Client.findAll({
        order: [
            ['fio', 'ASC'],
        ],
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

// get all clients with limit
exports.findAll = (req, res) => {
    const limit = req.query.limit;
    const offset = req.query.offset;
    Client.findAll({
        offset: offset,
        limit: limit,
        order: [
            ['fio', 'ASC'],
        ],
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

// get count of clients
exports.count = (req, res) => {
    Client.count()
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

// get client by id
exports.findOne = (req, res) => {
    const id = req.params.id;
    Client.findOne({
        where: {
            id: id,
        },
        include: [{
                model: Car,
                required:false
            },
            {
                model: Order,
                required:false
            },
        ],
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

// create and save new client
exports.create = (req, res) => {
    const { fio, birthday, phone, passport, driver_license } = req.body;
    if (!fio) {
        res.status(400).send({
            message: "Fio can not be empty"
        });
        return;
    }

    const id = uuidv4();
    const client = {
        id: id,
        fio: fio,
        birthday: birthday,
        phone: phone,
        passport: passport,
        driver_license: driver_license
    }
    Client.create(client)
        .then(data => {
            res.send(data);
        })
        .catch(err => {
            res.status(500).send({
                message: err.message
            });
        });
};

// update client by id
exports.update = (req, res) => {
    const id = req.params.id;
    const { fio, birthday, phone, passport, driver_license } = req.body;
    if (!fio) {
        res.status(400).send({
            message: "Fio can not be empty"
        });
        return;
    }
    Client.update(req.body, {
        where: {id: id}
    }).then(num => {
        if (num == 1) {
            res.send({
                message: "Client was updated successfully."
            });
        } else {
            res.send({
                message: `Cannot update Client with id=${id}. Maybe Client was not found or req.body is empty!`
            });
        }
    })
    .catch(err => {
        res.status(500).send({
            message: "Error updating Client with id=" + id
        });
    });
};

// remove client by id
exports.delete = (req, res) => {
    const id = req.params.id;

    Client.destroy({
        where: { id: id }
    })
    .then(num => {
        if (num == 1) {
            res.send({
                message: "Client was deleted successfully!"
            });
        } else {
            res.send({
                message: `Cannot delete Client with id=${id}. Maybe Client was not found!`
            });
        }
    })
    .catch(err => {
        res.status(500).send({
            message: "Could not delete Client with id=" + id
        });
    });
};