var axios = require("axios");
var qs = require("qs");

var app = require("express")();
const port = 8888;
require("dotenv").config();

app.use((req, res, next) => {
  res.header("Access-Control-Allow-Origin", "http://localhost:3000"); // update to match the domain you will make the request from
  res.header(
    "Access-Control-Allow-Headers",
    "X-ACCESS_TOKEN, Access-Control-Allow-Origin, Authorization, Origin, x-requested-with, Content-Type, Content-Range, Content-Disposition, Content-Description"
  );
  next();
});

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
    url: "https://api.linkedin.com/v2/me",
    headers: {
      Authorization: `Bearer ${token}`,
    },
  };

  axios(config)
    .then((response) => {
      console.log("✅ Request successful - Profile information fetched");
      return res.send(response.data);
    })
    .catch((error) => {
      console.log("❌ Error in the matrix");
      return res.send(error);
    });
});

app.listen(port, () => console.log("Server is listening on port: ", port));
