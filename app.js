const express = require("express");
const bodyParser = require("body-parser");
const cors = require("cors");

// create app
const app = express();

const port = 3080;
let whitelist = ['http://localhost:3080', 'http://localhost:8080']
// let corsOptions = {
//     origin: "http://localhost:3080"
// };
// let corsOptions = {
//     origin: function (origin, callback) {
//         if (whitelist.indexOf(origin) !== -1) {
//             callback(null, true)
//         } else {
//             callback(new Error('Not allowed by CORS'))
//         }
//     }
// }
// app.use(cors(corsOptions));
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