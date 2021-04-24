const db = require("../models");
const Master = db.master;
const Op = db.Sequelize.Op;
const { 
    v1: uuidv1,
    v4: uuidv4,
} = require('uuid');

// get all masters 
exports.findAllWithoutLimit = (req, res) => {
    Master.findAll()
        .then(data => {
            res.send(data);
        })
        .catch(err => {
            res.status(500).send({
                message: err.message
            });
        });
}

// get all masters with limit
exports.findAll = (req, res) => {
    const limit = req.query.limit;
    const offset = req.query.offset;
    Master.findAll({
        offset: offset,
        limit: limit
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

// get count of masters
exports.count = (req, res) => {
    Master.count()
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

// get master by id
exports.findOne = (req, res) => {
    const id = req.params.id;
    Master.findByPk(id)
        .then(data => {
            res.send(data);
        })
        .catch(err => {
            res.status(500).send({
                message: err.message
            });
        });
}

// create and save new master
exports.create = (req, res) => {
    const { fio, birthday, phone } = req.body;
    if (!fio) {
        res.status(400).send({
            message: "Fio can not be empty"
        });
        return;
    }

    const id = uuidv4();
    const master = {
        id: id,
        fio: fio,
        birthday: birthday,
        phone: phone
    }
    Master.create(master)
        .then(data => {
            res.send(data);
        })
        .catch(err => {
            res.status(500).send({
                message: err.message
            });
        });
};

// update master by id
exports.update = (req, res) => {
    const id = req.params.id;
    const { fio, birthday, phone } = req.body;
    if (!fio) {
        res.status(400).send({
            message: "Fio can not be empty"
        });
        return;
    }
    Master.update(req.body, {
        where: {id: id}
    }).then(num => {
        if (num == 1) {
            res.send({
                message: "Master was updated successfully."
            });
        } else {
            res.send({
                message: `Cannot update Master with id=${id}. Maybe Master was not found or req.body is empty!`
            });
        }
    })
    .catch(err => {
        res.status(500).send({
            message: "Error updating Master with id=" + id
        });
    });
};

// remove master by id
exports.delete = (req, res) => {
    const id = req.params.id;

    Master.destroy({
        where: { id: id }
    })
    .then(num => {
        if (num == 1) {
            res.send({
                message: "Master was deleted successfully!"
            });
        } else {
            res.send({
                message: `Cannot delete Master with id=${id}. Maybe Master was not found!`
            });
        }
    })
    .catch(err => {
        res.status(500).send({
            message: "Could not delete Master with id=" + id
        });
    });
};