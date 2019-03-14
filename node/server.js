const express = require('express');
const path = require('path');
const parser = require('body-parser');
const fs = require('fs');

global.appRoot = path.resolve(__dirname);

const app = express();

const port = process.env.port || 5001;

app.get('/', (req, res) => {
    res.send('Hello');
});

app.get('/listUsers', function(req, res) {
    fs.readFile(__dirname + '/' + 'users.json', 'utf8', function(err, data) {
        console.log(data);
        res.end(data);
    });
});

app.use(parser.urlencoded({extended: true}));
app.use(parser.json({ type: 'application/*+json' }));

app.post('/addUser', function(req, res) {
    fs.readFile(__dirname + '/' + 'users.json', 'utf8', function(err, data) {
        data = JSON.parse(data);
        data['user4'] = JSON.parse(Object.keys(req.body)[0]);
        json = JSON.stringify(data); //convert it back to json
        fs.writeFile('users.json',JSON.stringify(data), 'utf-8', function(err){
            if(err) throw err;
            res.end(JSON.stringify(data));
        }); 
    });
});

app.listen(port, () => console.log(`Listening to port ${port}`));