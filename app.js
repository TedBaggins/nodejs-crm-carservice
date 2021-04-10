const express = require("express");
const bodyParser = require("body-parser");
const cors = require("cors");

// create app
const app = express();
const port = 3080;
app.use(cors());
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));
app.listen(port, () => {
    console.log(`Server is running.`);
});

const db = require("./models");
//const Role = db.Role;
db.sequelize.sync();

require('./routes/auth.routes')(app);
require('./routes/user.routes')(app);

app.get("/", (req, res) => {
    res.json({ message: "Server is working" });
});