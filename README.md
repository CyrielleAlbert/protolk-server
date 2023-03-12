# Server of Protolk

## Prerequisite

[![Generic badge](https://img.shields.io/badge/NodeJS-18.11.0-<COLOR>.svg)](https://shields.io/)
[![Generic badge](https://img.shields.io/badge/MySQL-8.0.31-<COLOR>.svg)](https://shields.io/)

## Run a demo with a local dB

Frontend Repo can be fount [here](https://github.com/CyrielleAlbert/protolk)

### MySQL dB

#### Create a mySQL database

```bash
mysql -u root
```

```SQL
CREATE DATABASE PROTOLK_DB_TEST;
USE PROTOLK_DB_TEST;
SHOW TABLES;
```

#### Grant access

```SQL
CREATE USER 'newuser'@'localhost' IDENTIFIED WITH 'mysql_native_password' BY 'newpassword';
GRANT ALL PRIVILEGES ON * . * TO 'newuser'@'localhost';
FLUSH PRIVILEGES;
```

#### Create the tables

```bash
node Cyri-tests/db-init_create_tables.js
```

#### Populate mock-data

```bash
node Cyri-tests/db-init_insert_mock_data.js
```

#### Run the server

```bash
npm install
node server-rest.js
```
