const mysql = require("mysql");

const pool = mysql.createPool({
  connectionLimit: 100, //important
  host: "localhost",
  user: "newuser",
  password: "newpassword",
  database: "PROTOLK_DB_TEST",
  debug: false,
});

pool.query("SELECT * FROM Users where Users.token = 'ad'", (err, res) => {
  if (err) {
    console.log(err);
    return;
  }
  console.log("response", res.length);
  console.log("response type", typeof res);
});
