module.exports = (sequelize, Sequelize) => {
    const Service = sequelize.define("services", {
        id: {
            type: Sequelize.STRING,
            primaryKey: true,
            allowNull: false,
            unique: true
        },
        name: {
            type: Sequelize.STRING,
            allowNull: false
        },
        price: {
            type: Sequelize.INTEGER
        }
    }, {
        timestamps: false
    });

    return Service;
};