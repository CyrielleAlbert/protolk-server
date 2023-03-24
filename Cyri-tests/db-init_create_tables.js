const mysql = require("mysql");

const pool = mysql.createPool({
  connectionLimit: 100, //important
  host: "localhost",
  user: "newuser",
  password: "newpassword",
  database: "PROTOLK_DB_TEST",
  debug: false,
});

//Create Users table
pool.query(
  "CREATE TABLE Users (Id varchar(255) NOT NULL PRIMARY KEY, Firstname varchar(255), Lastname varchar(255), Token varchar(360), JobTitle varchar(255) );",
  (err, resp) => {
    if (err) {
      console.log(err);
      return;
    }
    console.log(resp);
  }
);
//Create Tag Table
pool.query(
  "CREATE TABLE Tags (Id varchar(255) NOT NULL PRIMARY KEY, Value varchar(255)), Color_hex varchar(255);",
  (err, resp) => {
    if (err) {
      console.log(err);
      return;
    }
    console.log(resp);
  }
);
//Create User Tags table
pool.query(
  "CREATE TABLE User_tags (User_id varchar(255), Tag_id varchar(255),PRIMARY KEY(User_id, Tag_id));",
  (err, resp) => {
    if (err) {
      console.log(err);
      return;
    }
    console.log(resp);
  }
);

//Create Room Table
pool.query(
  "CREATE TABLE Rooms (Id varchar(255) NOT NULL PRIMARY KEY, Name varchar(255));",
  (err, resp) => {
    if (err) {
      console.log(err);
      return;
    }
    console.log(resp);
  }
);

//Create Room Tags table
pool.query(
  "CREATE TABLE Room_tags (Room_id varchar(255), Tag_id varchar(255),PRIMARY KEY(Room_id, Tag_id));",
  (err, resp) => {
    if (err) {
      console.log(err);
      return;
    }
    console.log(resp);
  }
);

//Create Session Table
pool.query(
  "CREATE TABLE Session (id varchar(255) NOT NULL PRIMARY KEY,User_id_1 varchar(255), User_id_2 varchar(255), Room_id varchar(255));",
  (err, resp) => {
    if (err) {
      console.log(err);
      return;
    }
    console.log(resp);
  }
);

// // add rows in the table

// function addRow(data) {
//     let insertQuery = 'INSERT INTO ?? (??,??) VALUES (?,?)';
//     let query = mysql.format(insertQuery,["todo","user","notes",data.user,data.value]);
//     pool.query(query,(err, response) => {
//         if(err) {
//             console.error(err);
//             return;
//         }
//         // rows added
//         console.log(response.insertId);
//     });
// }

// // timeout just to avoid firing query before connection happens

// setTimeout(() => {
//     // call the function
//     addRow({
//         "user": "Shahid",
//         "value": "Just adding a note"
//     });
// },5000);

// // query rows in the table

// function queryRow(userName) {
//     let selectQuery = 'SELECT * FROM ?? WHERE ?? = ?';
//     let query = mysql.format(selectQuery,["todo","user", userName]);
//     // query = SELECT * FROM `todo` where `user` = 'shahid'
//     pool.query(query,(err, data) => {
//         if(err) {
//             console.error(err);
//             return;
//         }
//         // rows fetch
//         console.log(data);
//     });
// }

// // timeout just to avoid firing query before connection happens

// setTimeout(() => {
//     // call the function
//     // select rows
//     queryRow('shahid');
// },5000);

// // update rows

// function updateRow(data) {
//     let updateQuery = "UPDATE ?? SET ?? = ? WHERE ?? = ?";
//     let query = mysql.format(updateQuery,["todo","notes",data.value,"user",data.user]);
//     // query = UPDATE `todo` SET `notes`='Hello' WHERE `name`='shahid'
//     pool.query(query,(err, response) => {
//         if(err) {
//             console.error(err);
//             return;
//         }
//         // rows updated
//         console.log(response.affectedRows);
//     });
// }

// // timeout just to avoid firing query before connection happens

// setTimeout(() => {
//     // call the function
//     // update row
//     updateRow({
//         "user": "Shahid",
//         "value": "Just updating a note"
//     });
// },5000);
