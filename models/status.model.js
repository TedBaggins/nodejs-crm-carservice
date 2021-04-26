module.exports = (sequelize, Sequelize) => {
    const Status = sequelize.define("orderstatuses", {
        id: {
            type: Sequelize.STRING,
            primaryKey: true,
            allowNull: false,
            unique: true
        },
        name: {
            type: Sequelize.STRING,
            allowNull: false
        }
    }, {
        timestamps: false
    });

    return Status;
};