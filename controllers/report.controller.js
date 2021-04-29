const db = require("../models");
const Report = db.report;
const Op = db.Sequelize.Op;
const { 
    v1: uuidv1,
    v4: uuidv4,
} = require('uuid');

// create and save new report
exports.create = (req, res) => {
    const { description, order_id, master_id } = req.body;
    if (!description) {
        res.status(400).send({
            message: "Description can not be empty"
        });
        return;
    }
    if (!order_id) {
        res.status(400).send({
            message: "Order can not be empty"
        });
        return;
    }
    if (!master_id) {
        res.status(400).send({
            message: "Master can not be empty"
        });
        return;
    }

    const id = uuidv4();
    const report = {
        id: id,
        description: description,
        order_id: order_id,
        master_id: master_id
    }
    Report.create(report)
        .then(data => {
            res.send(data);
        })
        .catch(err => {
            res.status(500).send({
                message: err.message
            });
        });
};

// update report by id
exports.update = (req, res) => {
    const id = req.params.id;
    const { description, master_id  } = req.body;
    if (!description) {
        res.status(400).send({
            message: "Description can not be empty"
        });
        return;
    }
    if (!master_id) {
        res.status(400).send({
            message: "Master can not be empty"
        });
        return;
    }
    Report.update({
        description: description,
        master_id: master_id
    }, {
        where: {id: id}
    }).then(num => {
        if (num == 1) {
            res.send({
                message: "Report was updated successfully."
            });
        } else {
            res.send({
                message: `Cannot update Report with id=${id}. Maybe Report was not found or req.body is empty!`
            });
        }
    })
    .catch(err => {
        res.status(500).send({
            message: "Error updating Report with id=" + id
        });
    });
};

// remove order by id
exports.delete = (req, res) => {
    const id = req.params.id;

    Report.destroy({
        where: { id: id }
    })
    .then(num => {
        if (num == 1) {
            res.send({
                message: "Report was deleted successfully!"
            });
        } else {
            res.send({
                message: `Cannot delete Report with id=${id}. Maybe Report was not found`
            });
        }
    })
    .catch(err => {
        res.status(500).send({
            message: "Could not delete Report with id=" + id
        });
    });
};