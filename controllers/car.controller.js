const db = require("../models");
const Car = db.car;
const Client = db.client;
const Op = db.Sequelize.Op;
const { 
    v1: uuidv1,
    v4: uuidv4,
} = require('uuid');

// get all cars 
exports.findAllWithoutLimit = (req, res) => {
    Car.findAll({
        order: [
            ['mark', 'ASC'],
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

// get all client cars
exports.findClientCars = (req, res) => {
    const client_id = req.params.clientid;
    Car.findAll({
        where: { client_id: client_id },
        order: [
            ['mark', 'ASC'],
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

// get all cars
exports.findAll = (req, res) => {
    const limit = req.query.limit;
    const offset = req.query.offset;
    Car.findAll({
        offset: offset,
        limit: limit,
        order: [
            ['mark', 'ASC'],
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

// get car by id
exports.findOne = (req, res) => {
    const id = req.params.id;
    Car.findByPk(id)
        .then(data => {
            res.send(data);
        })
        .catch(err => {
            res.status(500).send({
                message: err.message
            });
        });
}

// create and save new car
exports.create = (req, res) => {
    const { mark, model, number, year, passport, client_id } = req.body;
    if (!mark) {
        res.status(400).send({
            message: "Mark can not be empty"
        });
        return;
    }
    if (!model) {
        res.status(400).send({
            message: "Model can not be empty"
        });
        return;
    }
    if (!number) {
        res.status(400).send({
            message: "Number can not be empty"
        });
        return;
    }
    const id = uuidv4();
    const car = {
        id: id,
        mark: mark,
        model: model,
        number: number,
        year: year,
        passport: passport,
        client_id: client_id
    }
    Car.create(car)
        .then(data => {
            res.send(data);
        })
        .catch(err => {
            res.status(500).send({
                message: err.message
            });
        });
};

// update car by id
exports.update = (req, res) => {
    const id = req.params.id;
    const { mark, model, number, year, passport, client_id } = req.body;
    if (!mark) {
        res.status(400).send({
            message: "Mark can not be empty"
        });
        return;
    }
    if (!model) {
        res.status(400).send({
            message: "Model can not be empty"
        });
        return;
    }
    if (!number) {
        res.status(400).send({
            message: "Number can not be empty"
        });
        return;
    }

    Car.update(req.body, {
        where: {id: id}
    }).then(num => {
        if (num == 1) {
            res.send({
                message: "Car was updated successfully."
            });
        } else {
            res.send({
                message: `Cannot update Car with id=${id}. Maybe Car was not found or req.body is empty!`
            });
        }
    })
    .catch(err => {
        res.status(500).send({
            message: "Error updating Car with id=" + id
        });
    });
};

// remove car by id
exports.delete = (req, res) => {
    const id = req.params.id;

    Car.destroy({
        where: { id: id }
    })
    .then(num => {
        if (num == 1) {
            res.send({
                message: "Car was deleted successfully!"
            });
        } else {
            res.send({
                message: `Cannot delete Car with id=${id}. Maybe Service was not found!`
            });
        }
    })
    .catch(err => {
        res.status(500).send({
            message: "Could not delete Car with id=" + id
        });
    });
};