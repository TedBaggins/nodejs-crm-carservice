const config = require("../config/db.config.js");
const Sequelize = require("sequelize");

const sequelize = new Sequelize(
    config.DB,
    config.USER,
    config.PASSWORD,
    {
        host: config.HOST,
        dialect: config.dialect,
        operatorsAliases: false,

        pool: {
            max: config.pool.max,
            min: config.pool.min,
            acquire: config.pool.acquire,
            idle: config.pool.idle
        }
    }
);

const db = {};

db.Sequelize = Sequelize;
db.sequelize = sequelize;

db.user = require("../models/user.model.js")(sequelize, Sequelize);
db.role = require("../models/role.model.js")(sequelize, Sequelize);
db.admin = require("../models/admin.model.js")(sequelize, Sequelize);
db.manager = require("../models/manager.model.js")(sequelize, Sequelize);
db.master = require("../models/master.model.js")(sequelize, Sequelize);
db.service = require("../models/service.model.js")(sequelize, Sequelize);

db.role.hasMany(db.user, {
    foreignKey: "role_id",
});
db.user.belongsTo(db.role, { 
    foreignKey: 'role_id' 
});
db.admin.hasMany(db.user, {
    foreignKey: "admin_id",
});
db.user.belongsTo(db.admin, { 
    foreignKey: 'admin_id' 
});
db.manager.hasMany(db.user, {
    foreignKey: "manager_id",
});
db.user.belongsTo(db.manager, { 
    foreignKey: 'manager_id' 
});
db.master.hasMany(db.user, {
    foreignKey: "master_id",
});
db.user.belongsTo(db.master, { 
    foreignKey: 'master_id' 
});

db.ROLES = ["manager", "master", "admin"];

module.exports = db;