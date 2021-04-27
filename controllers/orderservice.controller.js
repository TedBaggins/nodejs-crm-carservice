const db = require("../models");
const OrderService = db.orderservice;
const Service = db.service;
const Order = db.order;
const Op = db.Sequelize.Op;
const { 
    v1: uuidv1,
    v4: uuidv4,
} = require('uuid');

// create and save new order service
exports.create = (req, res) => {
    const { order_id, service_id } = req.body;
    if (!order_id) {
        res.status(400).send({
            message: "Order can not be empty"
        });
        return;
    }
    if (!service_id) {
        res.status(400).send({
            message: "Service can not be empty"
        });
        return;
    }

    const id = uuidv4();
    const orderservice = {
        id: id,
        order_id: order_id,
        service_id: service_id
    }

    // correct sum of order and add order service
    Service.findByPk(service_id)
        .then(data => {
            let price = data.price;
            Order.findByPk(order_id)
                .then(data => {
                    let sum = data.sum;
                    sum += price;
                    Order.update({
                        sum: sum
                    }, {
                        where: {
                            id: order_id
                        }
                    }).then(() => {
                        OrderService.create(orderservice)
                            .then(data => {
                                res.send(data);
                            })
                            .catch(err => {
                                res.status(500).send({
                                    message: err.message
                                });
                            });
                    })
                    .catch(err => {
                        res.status(500).send({
                            message: err.message
                        });
                        return;
                    });
                })
                .catch(err => {
                    res.status(500).send({
                        message: err.message
                    });
                    return;
                });
        })
        .catch(err => {
            res.status(500).send({
                message: err.message
            });
            return;
        });
};

// remove order service by id
exports.delete = (req, res) => {
    const id = req.params.id;

    // correct sum of order and delete order service
    OrderService.findByPk(id).then(data => {
        let order_id = data.order_id;
        let service_id = data.service_id;
        Service.findByPk(service_id).then(data => {
            let price = data.price;
            Order.findByPk(order_id).then(data => {
                let sum = data.sum;
                sum -= price;
                Order.update({
                    sum: sum
                }, {
                    where: {
                        id: order_id
                    }
                }).then(() => {
                    OrderService.destroy({
                        where: { id: id }
                    })
                    .then(num => {
                        if (num == 1) {
                            res.send({
                                message: "Order service was deleted successfully!"
                            });
                        } else {
                            res.send({
                                message: `Cannot delete Order service with id=${id}. Maybe Order service was not found!`
                            });
                        }
                    })
                    .catch(err => {
                        res.status(500).send({
                            message: "Could not delete Order service with id=" + id
                        });
                    });
                })
            })
            .catch(err => {
                res.status(500).send({
                    message: err.message
                });
                return;
            });
        })
        .catch(err => {
            res.status(500).send({
                message: err.message
            });
            return;
        });
    })
    .catch(err => {
        res.status(500).send({
            message: err.message
        });
        return;
    });
};