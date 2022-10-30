const addNewUser = async (pool, userData, callback) => {
  //TODO: improve error message/status
  const query = `SELECT * FROM Users WHERE Users.id = '${userData.id}'`;
  console.log(query);
  pool.query(query, (err, resp) => {
    if (err) {
      callback({ code: "500", message: "Internal Server Error" });
    }
    if (resp.length == 0) {
      pool.query(
        `INSERT INTO Users (Id,Firstname,Lastname,Token) VALUES ('${userData.id}', '${userData.firstName}','${userData.lastName}','${userData.token}');`,
        (err) => {
          if (err) {
            console.log("error", err);
            callback({ code: "500", message: "Internal Server Error" });
          }
          callback((response = { code: "201", message: " Created" }));
        }
      );
    } else {
      callback({ code: "400", message: "Bad Request - already in the db" });
    }
  });
};

const isUserinDB = async (pool, token, callback) => {
  const query = `SELECT * FROM Users WHERE Users.token = '${token}'`;
  console.log(query);
  pool.query(query, (err, res) => {
    if (err) {
      console.log(err);
      return;
    }
    callback(res);
  });
};

exports.databaseTools = { addNewUser, isUserinDB };
