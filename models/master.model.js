module.exports = (sequelize, Sequelize) => {
    const Master = sequelize.define("masters", {
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

    return Master;
};