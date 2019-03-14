const express = require('express');
const path = require('path');
const fs = require('fs');

global.appRoot = path.resolve(__dirname);

const app = express();

const port = process.env.port || 5001;

var user = {
    'user4': {
        'name': 'vishaka',
        'password': 'vishaka',
        'profession': 'engineer',
        'id': 4
    }
}

app.get('/', (req, res) => {
    res.send('Hello');
});

app.get('/listUsers', function(req, res) {
    fs.readFile(__dirname + '/' + 'users.json', 'utf8', function(err, data) {
        console.log(data);
        res.end(data);
    });
});

app.post('/addUser', function(req, res) {
    fs.readFile(__dirname + '/' + 'users.json', 'UTF-8', function(err, data) {
        console.log('data', data);
        data = JSON.parse(data);
        console.log('user ', data);
        data['user4'] = req.body['user4'];
        json = JSON.stringify(data); //convert it back to json
        fs.writeFile('user.json',JSON.stringify(data),function(err){
            if(err) throw err;
            res.end(JSON.stringify(data));
        });
        // fs.writeFile(__dirname + '/' + 'users.json', 'utf8', function(data) {
        //     console.log(data);
        //     res.end(JSON.stringify(data));
        // }); // write it back 
    });
});

app.listen(port, () => console.log(`Listening to port ${port}`));