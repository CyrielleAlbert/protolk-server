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
  "INSERT INTO Tags (Id, Value, Color_hex) VALUES ('000001','Dev', '#FFCFE6'),('000002','React','#FFCFE6'),('000003','Product dev','#FFCFE6'),('000004','Personal dev','#FFCFE6'),('000005','Data analysis','#AFEDB1'),('000006','Marketing','#AFEDB1'),('000007','Growth','#AFEDB1'),('000008','SEO','#AFEDB1'),('000009','Recruitment','#AFB5ED'),('000010','Networking','#AFB5ED'),  ('000011','Nerds','#AFB5ED'),('000012','London','#AFB5ED');",
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

//Insert Room_users (connection) Data

pool.query(
  "INSERT INTO Room_users (id,Room_id, User_id_1, User_id_2) VALUES ('ajf23','jco206','7d0abc3c-7c08-46d9-b65f-d0a67ddd2886','ec5a8e3f-363d-44d0-9358-56243e947ecb'),('gkti23','ajr253','81de446c-a61a-4484-ac9c-a9e152d5eae5','09a154fc-1d55-493a-99ae-e7452cc63ca7'),('kgju561'ajr253','8b14cc19-af20-4e7c-bc0f-6d03ecc755a2','wFBiQksNBi');",
  (err, resp) => {
    if (err) {
      console.log(err);
      return;
    }
    console.log(resp);
  }
);
