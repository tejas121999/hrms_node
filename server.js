const app = require("./index")
const port = 5000
// const mysql = require('mysql2');
// const config = require('./config/config.js')

// console.log(config.development.user)
// const connection = mysql.createConnection({
//     host: "db-mysql-blr1-95646-do-user-7146850-0.b.db.ondigitalocean.com",
//     user: config.development.user,
//     password: "AVNS_284RcIhSo4YIsT59JRH",
//     port: "25060",
//     database: "user"
// })


// connection.connect(function (err) {
//     if (err) {
//         return console.error('error: ' + err.message);
//     }
//     console.log('Connected to the MySQL server.');
// });
app.listen(port, () => {
    console.log(`Example app listening at port http://localhost:${port}`)
})
