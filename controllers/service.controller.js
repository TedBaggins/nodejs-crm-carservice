const db = require("../models");
const Service = db.service;
const Op = db.Sequelize.Op;
const { 
    v1: uuidv1,
    v4: uuidv4,
} = require('uuid');

// get all services without limit
exports.findAllWithoutLimit = (req, res) => {
    Service.findAll()
        .then(data => {
            res.send(data);
        })
        .catch(err => {
            res.status(500).send({
                message: err.message
            });
        });
}

// get all services
exports.findAll = (req, res) => {
    const limit = req.query.limit;
    const offset = req.query.offset;
    Service.findAll({
        offset: offset,
        limit: limit,
        order: [
            ['name', 'ASC'],
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

// get count of services
exports.count = (req, res) => {
    Service.count()
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

// get service by id
exports.findOne = (req, res) => {
    const id = req.params.id;
    Service.findByPk(id)
        .then(data => {
            res.send(data);
        })
        .catch(err => {
            res.status(500).send({
                message: err.message
            });
        });
}

// create and save new service
exports.create = (req, res) => {
    const { name, price } = req.body;
    if (!name) {
        res.status(400).send({
            message: "Name can not be empty"
        });
        return;
    }
    const id = uuidv4();
    const service = {
        id: id,
        name: name,
        price: price
    }
    Service.create(service)
        .then(data => {
            res.send(data);
        })
        .catch(err => {
            res.status(500).send({
                message: err.message
            });
        });
};

// update service by id
exports.update = (req, res) => {
    const id = req.params.id;
    const { name, price } = req.body;
    if (!name) {
        res.status(400).send({
            message: "Name can not be empty"
        });
        return;
    }
    Service.update(req.body, {
        where: {id: id}
    }).then(num => {
        if (num == 1) {
            res.send({
                message: "Service was updated successfully."
            });
        } else {
            res.send({
                message: `Cannot update Service with id=${id}. Maybe Service was not found or req.body is empty!`
            });
        }
    })
    .catch(err => {
        res.status(500).send({
            message: "Error updating Service with id=" + id
        });
    });
};

// remove service by id
exports.delete = (req, res) => {
    const id = req.params.id;

    Service.destroy({
        where: { id: id }
    })
    .then(num => {
        if (num == 1) {
            res.send({
                message: "Service was deleted successfully!"
            });
        } else {
            res.send({
                message: `Cannot delete Service with id=${id}. Maybe Service was not found!`
            });
        }
    })
    .catch(err => {
        res.status(500).send({
            message: "Could not delete Service with id=" + id
        });
    });
};