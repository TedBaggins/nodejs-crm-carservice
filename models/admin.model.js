module.exports = (sequelize, Sequelize) => {
    const Admin = sequelize.define("admins", {
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

    return Admin;
};