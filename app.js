const mysql = require("mysql2");
const express = require("express");

const app = express();

const APP_PORT = process.env.APP_PORT || 9000;
const DB_HOST = process.env.DB_HOST || "localhost";
const DB_NAME = process.env.DB_NAME || "viz_db";
const DB_USERNAME = process.env.DB_USERNAME || "viz1";
const DB_PASSWORD = process.env.DB_PASSWORD || "123456";
const ENCRYPT_KEY = process.env.AES_KEY || "";

// app.use(express.json());

app.use(function(req, res, next) {
  res.locals.connection = mysql.createConnection({
    host: DB_HOST,
    database: DB_NAME,
    user: DB_USERNAME,
    password: DB_PASSWORD
  });
  res.locals.connection.connect(error => {
    if (!error) {
      console.log("[+] Connected to DB");
    } else {
      next(error);
    }
  });
  next();
});

app.get(["/", "/api/v1/health-check"], function(req, res, next) {
  res.locals.connection.query("SELECT 1+1 AS sum", function(
    error,
    results,
    fields
  ) {
    if (error) {
      console.error("error", error);
      return next(error);
    }

    response = {
      success: results[0]["sum"] == 2,
      data: results[0]
    };
    res.json(response);
  });
});

app.get("/api/v1/encrypt", (req, res, next) => {
  const encryptSqlQuery = `SELECT HEX(AES_ENCRYPT("?", "${ENCRYPT_KEY}")) AS encrypted_data LIMIT 1`;

  const inputData = req.query["data"];

  res.locals.connection.query(encryptSqlQuery, [inputData], function(
    error,
    results,
    fields
  ) {
    if (error) {
      console.error("error", error);
      return next(error);
    }

    response = {
      success: true,
      data: results[0]
    };
    res.json(response);
  });
});

app.get("/api/v1/decrypt", (req, res, next) => {
  const decryptSqlQuery = `SELECT AES_DECRYPT(UNHEX("?"), "${ENCRYPT_KEY}") AS decrypted_data LIMIT 1`;

  const inputData = req.query["data"];

  res.locals.connection.query(decryptSqlQuery, [inputData], function(
    error,
    results,
    fields
  ) {
    if (error) {
      console.error("error", error);
      return next(error);
    }

    response = {
      success: true,
      data: results[0]
    };
    res.json(response);
  });
});

app.use(function(error, req, res, next) {
  console.error(error.stack);
  // error.message

  response = {
    success: false,
    errors: error.stack
  };
  res.status(500).json(response);
});

app.listen(APP_PORT, _ => {
  console.log(`[+] App Server started on ${APP_PORT}`);
});

process.on("SIGINT", function() {
  process.exit();
});
