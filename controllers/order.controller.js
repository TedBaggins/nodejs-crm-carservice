const db = require("../models");
const Order = db.order;
const Client = db.client;
const Car = db.car;
const Manager = db.manager;
const Master = db.master;
const Status = db.status;
const Service = db.service;
const Report = db.report;
const Op = db.Sequelize.Op;
const { 
    v1: uuidv1,
    v4: uuidv4,
} = require('uuid');

// get all orders with limit
exports.findAll = (req, res) => {
    const limit = req.query.limit;
    const offset = req.query.offset;
    Order.findAll({
        offset: offset,
        limit: limit,
        order: [
            ['number', 'ASC'],
        ],
        include: [{
                model: Status,
                required: false
            },
            {
                model: Client,
                required: false
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

// get all orders whose status is different from "created"
exports.findAllSubmitted = (req, res) => {
    const limit = req.query.limit;
    const offset = req.query.offset;
    const status = req.query.status;
    let whereStatement = {};
    if (status == "submitted") {
        whereStatement = {
            status_id: {
                [Op.not]: '8119ff0e-c103-459f-8df6-38953c55e104'
            }
        }
    } else if (status == "new") {
        whereStatement = {
            status_id: 'fb2bcb20-1ca7-475d-9551-ac0dca0cf67b'
        }
    } else if (status == "ongoing") {
        whereStatement = {
            status_id: '18af7a21-daa4-4eb8-a49d-73136735a330'
        }
    }
    Order.findAll({
        where: whereStatement,
        offset: offset,
        limit: limit,
        order: [
            ['number', 'ASC'],
        ],
        include: [{
                model: Status,
                required: false
            },
            {
                model: Client,
                required: false
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

// get count of orders
exports.count = (req, res) => {
    Order.count()
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

// get count of orders whose status is different from "created" 
exports.countSubmitted = (req, res) => {
    const status = req.query.status;
    let whereStatement = {};
    if (status == "submitted") {
        whereStatement = {
            status_id: {
                [Op.not]: '8119ff0e-c103-459f-8df6-38953c55e104'
            }
        }
    } else if (status == "new") {
        whereStatement = {
            status_id: 'fb2bcb20-1ca7-475d-9551-ac0dca0cf67b'
        }
    } else if (status == "ongoing") {
        whereStatement = {
            status_id: '18af7a21-daa4-4eb8-a49d-73136735a330'
        }
    }
    Order.count({
            where: whereStatement
        })
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

// get order by id
exports.findOne = (req, res) => {
    const id = req.params.id;
    Order.findOne({
        where: {
            id: id,
        },
        include: [{
                model: Status,
                required:false
            },
            {
                model: Client,
                required: false
            },
            {
                model: Car,
                required: false
            },
            {
                model: Manager,
                required: false
            },
            {
                model: Master,
                required: false
            },
            {
                model: Service,
                required: false
            },
            {
                model: Report,
                required: false
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

// create and save new order
exports.create = (req, res) => {
    const { client_id, car_id, manager_id } = req.body;
    if (!client_id) {
        res.status(400).send({
            message: "Client can not be empty"
        });
        return;
    }
    if (!car_id) {
        res.status(400).send({
            message: "Car can not be empty"
        });
        return;
    }
    if (!manager_id) {
        res.status(400).send({
            message: "Manager can not be empty"
        });
        return;
    }

    const id = uuidv4();
    const order = {
        id: id,
        sum: 0,
        created_at: new Date().getTime(),
        closed_at: null,
        client_id: client_id,
        car_id: car_id,
        manager_id: manager_id,
        master_id: null,
        status_id: '8119ff0e-c103-459f-8df6-38953c55e104'
    }
    Order.create(order)
        .then(data => {
            res.send(data);
        })
        .catch(err => {
            res.status(500).send({
                message: err.message
            });
        });
};

// update order by id
exports.update = (req, res) => {
    const id = req.params.id;
    const { client_id, car_id, manager_id  } = req.body;
    if (!client_id) {
        res.status(400).send({
            message: "Client can not be empty"
        });
        return;
    }
    if (!car_id) {
        res.status(400).send({
            message: "Car can not be empty"
        });
        return;
    }
    if (!manager_id) {
        res.status(400).send({
            message: "Manager can not be empty"
        });
        return;
    }
    Order.update(req.body, {
        where: {id: id}
    }).then(num => {
        if (num == 1) {
            res.send({
                message: "Order was updated successfully."
            });
        } else {
            res.send({
                message: `Cannot update Order with id=${id}. Maybe Order was not found or req.body is empty!`
            });
        }
    })
    .catch(err => {
        res.status(500).send({
            message: "Error updating Order with id=" + id
        });
    });
};

// remove order by id
exports.delete = (req, res) => {
    const id = req.params.id;

    Order.destroy({
        where: { id: id }
    })
    .then(num => {
        if (num == 1) {
            res.send({
                message: "Order was deleted successfully!"
            });
        } else {
            res.send({
                message: `Cannot delete Order with id=${id}. Maybe Order was not found!`
            });
        }
    })
    .catch(err => {
        res.status(500).send({
            message: "Could not delete Order with id=" + id
        });
    });
};

// change order status 
exports.changeStatus = (req, res) => {
    const id = req.params.id;
    const { status_id  } = req.body;
    if (!status_id) {
        res.status(400).send({
            message: "Status can not be empty"
        });
        return;
    }
    Order.update({
        status_id: status_id
    }, {
        where: {
            id: id
        }
    }).then(num => {
        if (num == 1) {
            res.send({
                message: "Order status was updated successfully."
            });
        } else {
            res.send({
                message: `Cannot update order with id=${id}.`
            });
        }
    }).catch(err => {
        res.status(500).send({
            message: "Error updating order with id=" + id
        });
    });
}