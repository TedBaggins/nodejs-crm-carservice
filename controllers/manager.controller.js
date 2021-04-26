const db = require("../models");
const Manager = db.manager;
const Op = db.Sequelize.Op;
const { 
    v1: uuidv1,
    v4: uuidv4,
} = require('uuid');

// get all managers 
exports.findAllWithoutLimit = (req, res) => {
    Manager.findAll({
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

// get all managers with limit
exports.findAll = (req, res) => {
    const limit = req.query.limit;
    const offset = req.query.offset;
    Manager.findAll({
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

// get count of managers
exports.count = (req, res) => {
    Manager.count()
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

// get manager by id
exports.findOne = (req, res) => {
    const id = req.params.id;
    Manager.findByPk(id)
        .then(data => {
            res.send(data);
        })
        .catch(err => {
            res.status(500).send({
                message: err.message
            });
        });
}

// create and save new manager
exports.create = (req, res) => {
    const { fio, birthday, phone } = req.body;
    if (!fio) {
        res.status(400).send({
            message: "Fio can not be empty"
        });
        return;
    }

    const id = uuidv4();
    const manager = {
        id: id,
        fio: fio,
        birthday: birthday,
        phone: phone
    }
    Manager.create(manager)
        .then(data => {
            res.send(data);
        })
        .catch(err => {
            res.status(500).send({
                message: err.message
            });
        });
};

// update manager by id
exports.update = (req, res) => {
    const id = req.params.id;
    const { fio, birthday, phone } = req.body;
    if (!fio) {
        res.status(400).send({
            message: "Fio can not be empty"
        });
        return;
    }
    Manager.update(req.body, {
        where: {id: id}
    }).then(num => {
        if (num == 1) {
            res.send({
                message: "Manager was updated successfully."
            });
        } else {
            res.send({
                message: `Cannot update Manager with id=${id}. Maybe Manager was not found or req.body is empty!`
            });
        }
    })
    .catch(err => {
        res.status(500).send({
            message: "Error updating Manager with id=" + id
        });
    });
};

// remove manager by id
exports.delete = (req, res) => {
    const id = req.params.id;

    Manager.destroy({
        where: { id: id }
    })
    .then(num => {
        if (num == 1) {
            res.send({
                message: "Manager was deleted successfully!"
            });
        } else {
            res.send({
                message: `Cannot delete Manager with id=${id}. Maybe Manager was not found!`
            });
        }
    })
    .catch(err => {
        res.status(500).send({
            message: "Could not delete Manager with id=" + id
        });
    });
};