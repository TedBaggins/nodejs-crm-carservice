module.exports = (sequelize, Sequelize) => {
    const Report = sequelize.define("orderreports", {
        id: {
            type: Sequelize.STRING,
            primaryKey: true,
            allowNull: false,
            unique: true
        },
        description: {
            type: Sequelize.TEXT,
        },
        order_id: {
            type: Sequelize.STRING
        },
        master_id: {
            type: Sequelize.STRING
        }
    }, {
        timestamps: false
    });

    return Report;
};