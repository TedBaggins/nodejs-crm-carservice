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
db.client = require("../models/client.model.js")(sequelize, Sequelize);
db.car = require("../models/car.model.js")(sequelize, Sequelize);
db.order = require("../models/order.model.js")(sequelize, Sequelize);
db.status = require("../models/status.model.js")(sequelize, Sequelize);
db.report = require("../models/report.model.js")(sequelize, Sequelize);

// role-user relation
db.role.hasMany(db.user, {
    foreignKey: "role_id",
});
db.user.belongsTo(db.role, { 
    foreignKey: 'role_id' 
});
// admin-user relation
db.admin.hasMany(db.user, {
    foreignKey: "admin_id",
});
db.user.belongsTo(db.admin, { 
    foreignKey: 'admin_id' 
});
// manager-user relation
db.manager.hasMany(db.user, {
    foreignKey: "manager_id",
});
db.user.belongsTo(db.manager, { 
    foreignKey: 'manager_id' 
});
// master-user relation
db.master.hasMany(db.user, {
    foreignKey: "master_id",
});
db.user.belongsTo(db.master, { 
    foreignKey: 'master_id' 
});
// client-car relation
db.client.hasMany(db.car, {
    foreignKey: "client_id",
});
db.car.belongsTo(db.client, { 
    foreignKey: 'client_id' 
});
// client-order relation
db.client.hasMany(db.order, {
    foreignKey: "client_id",
});
db.order.belongsTo(db.client, {
    foreignKey: "client_id",
});
// car-order relation
db.car.hasMany(db.order, {
    foreignKey: "car_id",
});
db.order.belongsTo(db.car, {
    foreignKey: "car_id",
});
// status-order relation
db.status.hasMany(db.order, {
    foreignKey: "status_id",
});
db.order.belongsTo(db.status, {
    foreignKey: "status_id",
});
// manager-order relation
db.manager.hasMany(db.order, {
    foreignKey: "manager_id",
});
db.order.belongsTo(db.manager, {
    foreignKey: "manager_id",
});
// master-order relation
db.master.hasMany(db.order, {
    foreignKey: "master_id",
});
db.order.belongsTo(db.master, {
    foreignKey: "master_id",
});
// order-report relation
db.order.hasMany(db.report, {
    foreignKey: "order_id",
});
db.report.belongsTo(db.order, {
    foreignKey: "order_id",
});
// master-report relation
db.master.hasMany(db.report, {
    foreignKey: "master_id",
});
db.report.belongsTo(db.master, {
    foreignKey: "master_id",
});

db.ROLES = ["manager", "master", "admin"];

module.exports = db;