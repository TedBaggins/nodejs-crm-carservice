module.exports = (sequelize, Sequelize) => {
    const User = sequelize.define("users", {
        id: {
            type: Sequelize.STRING,
            primaryKey: true,
            allowNull: false,
            unique: true
        },
        login: {
            type: Sequelize.STRING,
            allowNull: false
        },
        email: {
            type: Sequelize.STRING
        },
        password: {
            type: Sequelize.STRING,
            allowNull: false
        },
        role_id : {
            type: Sequelize.STRING
        },
        manager_id: {
            type: Sequelize.STRING
        },
        master_id: {
            type: Sequelize.STRING
        },
        admin_id: {
            type: Sequelize.STRING
        }
    }, {
        timestamps: false
    });

    return User;
};