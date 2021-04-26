module.exports = (sequelize, Sequelize) => {
    const Client = sequelize.define("clients", {
        id: {
            type: Sequelize.STRING,
            primaryKey: true,
            allowNull: false,
            unique: true
        },
        fio: {
            type: Sequelize.STRING,
            allowNull: false
        },
        birthday: {
            type: Sequelize.STRING
        },
        phone: {
            type: Sequelize.STRING
        },
        passport: {
            type: Sequelize.STRING
        },
        driver_license: {
            type: Sequelize.STRING
        }
    }, {
        timestamps: false
    });

    return Client;
};