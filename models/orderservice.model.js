const db = require("../models");
const Order = db.order;
const Service = db.service;

module.exports = (sequelize, Sequelize) => {
    const OrderService = sequelize.define("ordersservices", {
        id: {
            type: Sequelize.STRING,
            primaryKey: true,
            allowNull: false,
            unique: true
        },
        order_id: {
            type: Sequelize.STRING,
            // references: {
            //     model: Order,
            //     key: 'id'
            // }
        },
        service_id: {
            type: Sequelize.STRING,
            // references: {
            //     model: Service,
            //     key: 'id'
            // }
        },
    }, {
        timestamps: false
    });

    return OrderService;
};