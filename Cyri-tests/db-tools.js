const addNewUser = async (pool, userData, callback) => {
  //TODO: improve error message/status
  const query = `SELECT * FROM Users WHERE Users.id = '${userData.id}'`;
  console.log(query);
  pool.query(query, (err, resp) => {
    if (err) {
      callback({ code: "500", message: "Internal Server Error" });
    } else if (resp.length == 0) {
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
      const query = `UPDATE Users SET token = "${userData.token}" WHERE id = "${userData.id}";`;
      pool.query(query, (err, resp) => {
        if (err) {
          console.log(err);
          callback({ code: "500", message: "Can't update token in the db" });
          return;
        }
        console.log("✅ Request successful - Token updated");
        callback({ code: "200", message: "Token updated" });
      });
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

const getUserTags = async (pool, token, callback) => {
  const query = `SELECT USER_TAGS.tag_id, TAGS.value, TAGS.color_hex FROM TAGS, USER_TAGS,USERS WHERE USERS.TOKEN="${token}" AND USER_TAGS.USER_ID=USERS.ID AND TAGS.ID = USER_TAGS.TAG_ID`;
  pool.query(query, (err, resp) => {
    if (err) {
      callback({ code: "500", message: err });
      console.log("❌ Error in the matrix");
      console.error("error ");
      return;
    }
    console.log("✅ Request successful - user tags information fetched");

    console.log(resp);
    callback(resp);
  });
};

exports.databaseTools = { addNewUser, isUserinDB, getUserTags };
