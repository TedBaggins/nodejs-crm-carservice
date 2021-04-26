module.exports = (sequelize, Sequelize) => {
    const Car = sequelize.define("cars", {
        id: {
            type: Sequelize.STRING,
            primaryKey: true,
            allowNull: false,
            unique: true
        },
        mark: {
            type: Sequelize.STRING,
        },
        model: {
            type: Sequelize.STRING,
        },
        number: {
            type: Sequelize.STRING,
            allowNull: false
        },
        year: {
            type: Sequelize.INTEGER
        },
        passport: {
            type: Sequelize.STRING,
        },
        client_id: {
            type: Sequelize.STRING
        }
    }, {
        timestamps: false
    });

    return Car;
};