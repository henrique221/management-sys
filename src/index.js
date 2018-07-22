'use strict'

const express = require('express');
const bodyParser = require('body-parser')
const path = require('path');
const swig = require('swig');

const app = express();
const router = express.Router();

app.use(bodyParser.urlencoded({ extended: false }))

app.engine('html', swig.renderFile);
app.set('view engine', 'html');
app.set('views', path.join(__dirname, '/views/'));
app.use('/static', express.static(path.join(__dirname, '../public/')));

router.get('/home', (req, res) => {
    res.render(
        'index.html',
        {}
    );
});

router.get('/burndown', (req, res) => {
    res.render(
        'burndown.html',
        {}
    );
});

router.post('/burndown', (req, res) => {
    var fs = require('fs')
    var data = {}
    data.table = []

    const remaining = req.body.remaining;
    const bugs = req.body.bugs;
    const extra = req.body.extra;
    const improvements = req.body.improvements

    res.set('Content-Type', 'text/plain')
    res.send(`Remaining: ${remaining} \nBugs: ${bugs} \nExtra: ${extra} \nImprovements: ${improvements}`);
    data.table.push(remaining, bugs, extra, improvements);

    console.log(data.table);

    fs.writeFile("myjsonfile.json", JSON.stringify(data), function (err) {
        if (err) throw err;
        console.log('complete');
    });
    res.redirect('/burndown');
});

app.use('/', router);

app.listen(8080, () => {
    process.stdout.write(`Starting the ms application on port 8080 with development environment`);
});