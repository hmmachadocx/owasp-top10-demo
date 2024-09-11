const express = require('express');
const fs = require('fs');
const app = express();

// === Type 4: Insecure Design ===
// Allowing users to upload files without proper validation and storing them in a public folder
app.post('/upload', (req, res) => {
    let file = req.files.file;
    
    // No validation of file type or size
    file.mv(`./public/uploads/${file.name}`, (err) => {
        if (err) {
            return res.status(500).send('Error uploading file');
        }
        res.send('File uploaded');
    });
});

// === Type 8: Software and Data Integrity Failures ===
// Using an external library without verifying its integrity or signing the updates
const request = require('request');

// Fetching data from an external source without verifying its integrity
app.get('/data', (req, res) => {
    request('http://unverified-source.com/api/data', (error, response, body) => {
        if (error || response.statusCode !== 200) {
            return res.status(500).send('Failed to fetch data');
        }
        
        // Assume the data is safe without validation
        res.send(body);
    });
});

// === Type 9: Security Logging and Monitoring Failures ===
// Insufficient logging and monitoring
app.post('/login', (req, res) => {
    const { username, password } = req.body;

    // No logging of suspicious activities or login attempts
    if (username === 'admin' && password === 'password123') {
        res.send('Welcome Admin');
    } else {
        // No logging of failed login attempts
        res.status(401).send('Unauthorized');
    }
});

app.listen(3000, () => {
    console.log('Server running on port 3000');
});
