const express = require("express");
const app = express();
const cors = require("cors");
const _PORT = process.env.PORT;

app.use(cors());
app.use(express.json());

const bcrypt = require('bcrypt');
const jwt = require('jsonwebtoken')

const mysql = require('mysql2');

const crypto = require('crypto');
const secret = process.env.KEY;

const host = process.env.HOST;
const user = process.env.USER;
const password = process.env.PASSWORD;
const database = process.env.DATABASE;

const connection = mysql.createConnection({
    host: host,
    user: user,
    password: password,
    database: database
});

connection.connect((err) => {
    if (err) {
        console.error('Error connecting to database: ' + err.stack);
        return;
    }
    console.log('Connected to database as ID ' + connection.threadId);
});

function decryptMessage(encryptedMessage, key) {

    const iv = encryptedMessage.substring(0, 32);
    const encryptedData = encryptedMessage.substring(32);

    const decipher = crypto.createDecipheriv('aes-256-cbc', Buffer.from(key, 'hex'), Buffer.from(iv, 'hex'));
    let decrypted = decipher.update(encryptedData, 'hex', 'utf-8');
    decrypted += decipher.final('utf-8');

    return decrypted;
}

app.get("/users", (req, res) => {
    connection.query('SELECT * FROM user', function (error, results, fields) {
        if (error) {
            console.error('Error querying database: ' + error.stack);
            res.status(500).send('Internal Server Error');
            return;
        }

        const decryptedResults = results.map(user => ({
            ...user,
            message: decryptMessage(user.message, secret)
        }));

        res.json(decryptedResults);
    });
});


function encryptMessage(message, key) {
    const iv = crypto.randomBytes(16);
    const cipher = crypto.createCipheriv('aes-256-cbc', Buffer.from(key, 'hex'), iv);
    let encrypted = cipher.update(message, 'utf-8', 'hex');
    encrypted += cipher.final('hex');
    return iv.toString('hex') + encrypted;
}


app.post("/createusers", (req, res) => {
    const user = req.body;
    console.log(user);

    const encryptedMessage = encryptMessage(user.message, secret);

    const hashedPassword = bcrypt.hashSync(user.password, 10);

    connection.query('INSERT INTO user (name, password, message) VALUES (?, ?, ?)', 
    [user.username, hashedPassword, encryptedMessage], function (error, results, fields) {
        if (error) {
            console.error('Error inserting user into database: ' + error.stack);
            res.status(500).send('Internal Server Error');
            return;
        }
        res.status(201).json({ message: 'User created successfully', user: { id: results.insertId, name: user.name } });
    });
});

app.post("/login", (req, res) => {
    const user = req.body;

    connection.query('SELECT * FROM user WHERE name = ?', [user.username], function (error, results, fields) {
        if (error) {
            console.error('Error querying database: ' + error.stack);
            res.status(500).send('Internal Server Error');
            return;
        }

        if (results.length === 0) {
            res.status(400).json({ error: 'Username does not exist' });
            return;
        }
        const isPasswordValid = bcrypt.compare(user.password, results[0].password);

        if (isPasswordValid) {
            const token = jwt.sign({ id: results[0].id }, process.env.SECRET);
            res.status(200).json({ message: 'Authentication successful', user: { id: results[0].id, name: user.name }, token: token });
        } else {
            res.status(401).json({ error: 'Username or password is incorrect' });
        }
    });
});




app.listen(_PORT, () => {
    console.log("Server Works");
});
