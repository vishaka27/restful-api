const express = require('express');
const path = require('path');
const parser = require('body-parser');
const fs = require('fs');

global.appRoot = path.resolve(__dirname);

const app = express();
var id = 4;

app.use(function(req, res, next) {
    res.header("Access-Control-Allow-Origin", "*");
    res.header("Access-Control-Allow-Methods", "GET, POST, OPTIONS, PUT, DELETE");
    res.header(
      "Access-Control-Allow-Headers",
      "Origin, X-Requested-With, Content-Type, Accept"
    );
    next();
});
  

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

app.delete('/deleteUser/:id', function(req, res) {
    fs.readFile(__dirname + '/' + 'users.json', 'utf8', function(err, data) {
        data = JSON.parse(data);
        delete data['user' + req.params.id];
        fs.writeFile('users.json',JSON.stringify(data), 'utf-8', function(err){
            if(err) throw err;
            res.end(JSON.stringify(data));
        }); 
    });
});

app.use(parser.urlencoded({extended: true}));
app.use(parser.json({ type: 'application/*+json' }));

app.post('/addUser', function(req, res) {
    fs.readFile(__dirname + '/' + 'users.json', 'utf8', function(err, data) {
        data = JSON.parse(data);
        count = Object.keys(data).length;
        data["user" + (count + 1)] = JSON.parse(Object.keys(req.body)[0]);
        json = JSON.stringify(data); //convert it back to json
        fs.writeFile('users.json',JSON.stringify(data), 'utf-8', function(err){
            if(err) throw err;
            res.end(JSON.stringify(data));
        }); 
    });
});

app.get('/:id', function(req, res) {
    fs.readFile( __dirname + "/" + "users.json", 'utf8', function (err, data) {
        var users = JSON.parse(data);
        var user = users["user" + req.params.id];
        res.send(user);
     });
});


app.listen(port, () => console.log(`Listening to port ${port}`));