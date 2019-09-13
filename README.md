# Kubernetes World

## Installation

`npm install`


## Create DB User

```
CREATE DATABASE viz_db;

CREATE USER 'viz'@'%' IDENTIFIED WITH mysql_native_password BY '123456';

GRANT ALL PRIVILEGES ON viz_db.* TO 'viz'@'%';

FLUSH PRIVILEGES;
```


## Running

- `node app.js`
- `nodemon app.js`