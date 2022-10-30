const mysql = require("mysql");

const pool = mysql.createPool({
  connectionLimit: 100, //important
  host: "localhost",
  user: "newuser",
  password: "newpassword",
  database: "PROTOLK_DB_TEST",
  debug: false,
});

// Insert mock Users data

pool.query(
  "INSERT INTO Users (Id,Firstname,Lastname,Token,JobTitle) VALUES ('7d0abc3c-7c08-46d9-b65f-d0a67ddd2886', 'Wade', 'Frederick', 'qwertyuiopasdfghjklzxcvbnm123457', 'Software developer at Gemo'),('81de446c-a61a-4484-ac9c-a9e152d5eae5','Tamekah', 'Schneider', 'qwertyuiopasdfghjklzxcvbnm123458', 'Business analyst at brain AI'),('8b14cc19-af20-4e7c-bc0f-6d03ecc755a2', 'Nerea', 'Hines', 'qwertyuiopasdfghjklzxcvbnm123459', 'Sales representative at Goegoe'),('09a154fc-1d55-493a-99ae-e7452cc63ca7', 'Gage', 'Diaz', 'qwertyuiopasdfghjklzxcvbnm123460', 'UX designer at WorldWise'),('ec5a8e3f-363d-44d0-9358-56243e947ecb', 'Nero', 'Wright', 'qwertyuiopasdfghjklzxcvbnm123461', 'CEO at JJT');",
  (err, resp) => {
    if (err) {
      console.log(err);
      return;
    }
    console.log(resp);
  }
);

// Insert mock Rooms data

pool.query(
  "INSERT INTO Rooms (Id, Name) VALUES ('ajr253','Product Development'), ('jco206','Software development'),('kdo452','React Nerds'),('psj4375','Networking in London'),('wqq035','Growth strategy in covid time');",
  (err, resp) => {
    if (err) {
      console.log(err);
      return;
    }
    console.log(resp);
  }
);

// Insert mock Tags data

pool.query(
  "INSERT INTO Tags (Id, Value) VALUES ('000001','Dev'),('000002','React'),('000003','Product dev'),('000004','Personal dev'),('000005','Data analysis'),('000006','Marketing'),('000007','Growth'),('000008','SEO'),('000009','Recruitment'),('000010','Networking'),  ('000011','Nerds'),('000012','London');",
  (err, resp) => {
    if (err) {
      console.log(err);
      return;
    }
    console.log(resp);
  }
);

// Insert mock User_tags data

pool.query(
  "INSERT INTO User_tags (User_id, Tag_id) VALUES ('7d0abc3c-7c08-46d9-b65f-d0a67ddd2886','000001'),('7d0abc3c-7c08-46d9-b65f-d0a67ddd2886','000002'),('7d0abc3c-7c08-46d9-b65f-d0a67ddd2886','000003'),('7d0abc3c-7c08-46d9-b65f-d0a67ddd2886','000004'),('81de446c-a61a-4484-ac9c-a9e152d5eae5','000003'),('81de446c-a61a-4484-ac9c-a9e152d5eae5','000005'),('81de446c-a61a-4484-ac9c-a9e152d5eae5','000006'),('8b14cc19-af20-4e7c-bc0f-6d03ecc755a2','000006'),('8b14cc19-af20-4e7c-bc0f-6d03ecc755a2','000007'),('8b14cc19-af20-4e7c-bc0f-6d03ecc755a2','000008'),('09a154fc-1d55-493a-99ae-e7452cc63ca7','000003'),('09a154fc-1d55-493a-99ae-e7452cc63ca7','000004'),('09a154fc-1d55-493a-99ae-e7452cc63ca7','000007'),('09a154fc-1d55-493a-99ae-e7452cc63ca7','000006'),('ec5a8e3f-363d-44d0-9358-56243e947ecb','000003'),('ec5a8e3f-363d-44d0-9358-56243e947ecb','000005'),('ec5a8e3f-363d-44d0-9358-56243e947ecb','000006'),('ec5a8e3f-363d-44d0-9358-56243e947ecb','000007'),('ec5a8e3f-363d-44d0-9358-56243e947ecb','000008'),('ec5a8e3f-363d-44d0-9358-56243e947ecb','000009');",
  (err, resp) => {
    if (err) {
      console.log(err);
      return;
    }
    console.log(resp);
  }
);

//Insert mock Room tags data

pool.query(
  "INSERT INTO Room_tags (Room_id,Tag_id) VALUES ('ajr253','000003'),('ajr253','000007'),('ajr253','000006'),('jco206','000001'),('jco206','000002'),('kdo452','000002'),('kdo452','000010'),('kdo452','000011'),('psj4375','000012'),('psj4375','000010'),('wqq035','000007'),  ('wqq035','000006'),  ('wqq035','000003');",
  (err, resp) => {
    if (err) {
      console.log(err);
      return;
    }
    console.log(resp);
  }
);

//Insert Connection Data

pool.query(
  "INSERT INTO Room_users (Room_id, User_id) VALUES ('jco206','7d0abc3c-7c08-46d9-b65f-d0a67ddd2886'),('jco206','ec5a8e3f-363d-44d0-9358-56243e947ecb'),('ajr253','81de446c-a61a-4484-ac9c-a9e152d5eae5'),('ajr253','09a154fc-1d55-493a-99ae-e7452cc63ca7'),('ajr253','8b14cc19-af20-4e7c-bc0f-6d03ecc755a2');",
  (err, resp) => {
    if (err) {
      console.log(err);
      return;
    }
    console.log(resp);
  }
);
