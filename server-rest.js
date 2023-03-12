var axios = require("axios");
var qs = require("qs");
var uuid = require("uuid");
var cors = require("cors");
var bodyParser = require("body-parser");

var app = require("express")();
const mysql = require("mysql");
const { databaseTools } = require("./Cyri-tests/db-tools");

const port = 8888;
require("dotenv").config();

//local test database - mock data

const pool = mysql.createPool({
  connectionLimit: 100, //important
  host: "127.0.0.1",
  user: "newuser",
  password: "newpassword",
  database: "PROTOLK_DB_TEST",
  debug: false,
});
pool.query(`SELECT * from USERS`, (err, resp) => {
  if (err) {
    console.log(err);
  } else {
    //console.log(resp);
  }
});

app.use(cors());
app.use(bodyParser.urlencoded({ extended: false }));
app.use(bodyParser.json());

app.get("/linkedin/accessToken", (req, res, next) => {
  console.log("🔑 Get access Token");
  const authorizationToken = req.query.code;
  var data = qs.stringify({
    grant_type: "authorization_code",
    code: authorizationToken,
    redirect_uri: "http://localhost:3000/linkedin",
    client_id: process.env.REACT_APP_CLIENT_ID,
    client_secret: process.env.REACT_APP_CLIENT_SECRET,
  });
  var config = {
    method: "post",
    url: "https://www.linkedin.com/oauth/v2/accessToken",
    headers: {
      "Content-Type": "application/x-www-form-urlencoded",
    },
    data: data,
  };
  axios(config)
    .then((response) => {
      console.log("✅ Request successful - Access Token received ");
      return res.send(response.data);
    })
    .catch((error) => {
      console.log("❌ Error in the matrix");
      return res.send(error);
    });
});

app.get("/linkedin/profile", (req, res) => {
  console.log("ℹ️ Get Profile Information");
  const token = req.query.token;

  var config = {
    method: "get",
    url: "https://api.linkedin.com/v2/me?projection=(id,firstName,lastName,profilePicture(displayImage~:playableStreams))",
    headers: {
      Authorization: `Bearer ${token}`,
    },
  };

  axios(config)
    .then((response) => {
      console.log("✅ Request successful - Profile information fetched");
      // console.log(response.data);
      return res.send(response.data);
    })
    .catch((error) => {
      console.log("❌ Error in the matrix");
      return res.send(error);
    });
});

app.get("/data/getUserData", (req, res) => {
  console.log("ℹ️ Get user info");
  const token = req.query.token;

  pool.query(
    `SELECT * from Users WHERE Users.token = ${token}`,
    (err, resp) => {
      if (err) {
        console.log(err);
        return;
      }
      console.log(resp);
      res.send(resp);
    }
  );
});

app.post("/data/addNewUser", (req, res) => {
  console.log("ℹ️ Add new user in dB");
  var data = JSON.parse(Object.keys(req.body)[0]);
  const userData = {
    token: data.token,
    firstName: data.firstName,
    lastName: data.lastName,
    id: data.id,
    // jobTitle: data.jobTitle,
  };
  // console.log(userData);
  databaseTools.addNewUser(pool, userData, (response) => {
    res.send(response);
  });
});

// app.post("/data/updateToken", (req, res) => {
//   console.log("ℹ️ Update token in dB");
//   var data = JSON.parse(Object.keys(req.body)[0]);
//   const query = `UPDATE Users SET token = ${data.token} WHERE id = ${data.id}`;
//   pool.query(query, (err, resp) => {
//     if (err) {
//       console.log(err);
//       console.log("❌ Error in the matrix");
//       return;
//     }
//     console.log(resp);
//     console.log("✅ Request successful - Token updated");
//     res.send(resp);
//   });
// });

app.get("/data/getUserTags", (req, res) => {
  console.log("ℹ️ Get User Tags Information");

  const token = req.query.token;
  databaseTools.getUserTags(pool, token, (response) => {
    res.send(response);
  });
});

app.listen(port, () => console.log("Server is listening on port: ", port));
