module.exports = (sequelize, Sequelize) => {
    const Manager = sequelize.define("managers", {
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
        }
    }, {
        timestamps: false
    });

    return Manager;
};