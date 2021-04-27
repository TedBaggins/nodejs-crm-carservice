module.exports = (sequelize, Sequelize) => {
    const Order = sequelize.define("orders", {
        id: {
            type: Sequelize.STRING,
            primaryKey: true,
            allowNull: false,
            unique: true
        },
        number: {
            type: Sequelize.INTEGER,
        },
        sum: {
            type: Sequelize.INTEGER
        },
        client_id: {
            type: Sequelize.STRING
        },
        car_id: {
            type: Sequelize.STRING
        },
        manager_id: {
            type: Sequelize.STRING
        },
        master_id: {
            type: Sequelize.STRING
        },
        status_id: {
            type: Sequelize.STRING
        },
        created_at: {
            type: Sequelize.STRING
        },
        closed_at: {
            type: Sequelize.STRING
        },
    }, {
        timestamps: false
    });

    return Order;
};