const mysql = require('mysql2');
const express = require('express');

const app = express();
const APP_PORT = 9000;
const DB_HOST = process.env.DB_HOST || 'localhost';
const DB_NAME = process.env.DB_NAME || 'viz_db';
const DB_USERNAME = process.env.DB_USERNAME || 'viz1';
const DB_PASSWORD = process.env.DB_PASSWORD || '123456';

app.use(function(req, res, next) {
	res.locals.connection = mysql.createConnection({
		host: DB_HOST,
		database: DB_NAME,
		user: DB_USERNAME,
        password: DB_PASSWORD
	});
	res.locals.connection.connect();
	next();
});

app.get('/api/v1/health-check', function(req, res, next) {
	res.locals.connection.query('SELECT 1+1 AS sum', function (error, results, fields) {
        if (error) throw error;
        
        data = {
            success: results[0]['sum'] == 2,
            data: results
        }
		res.send(data);
	});
});


app.listen(APP_PORT, _ => {
    console.log(`[+] App Server started on ${APP_PORT}`);
});