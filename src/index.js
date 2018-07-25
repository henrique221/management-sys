'use strict'

const express = require('express');
const bodyParser = require('body-parser')
const path = require('path');
const swig = require('swig');

const app = express();
const router = express.Router();

const datas = require('./views/data')
const { insertSprint, insertProgresso, selectProgresso } = require('./models/model')

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

const conteudo = selectProgresso(function(err, content){
    if (err) {
        console.log(err);
        
    } else {
        return content;
        content.selectProgresso
    }
})
console.log({conteudo})

router.get('/burndown', (req, res) => {
        res.render(
            'burndown.html'),
            {}
        });



router.post('/burndown', (req, res) => {
    var fs = require('fs')
    var data = {}
    data.table = []

    const date = req.body.date;
    const remaining = req.body.remaining;
    const bugs = req.body.bugs;
    const extra = req.body.extra;
    const improvements = req.body.improvements

    datas.progresso.data = date
    datas.progresso.remainingTasks = remaining
    datas.progresso.bugs = bugs
    datas.progresso.extraTasks = extra
    datas.progresso.improvements = improvements

    insertProgresso(datas.progresso);

    data.table.push(remaining, bugs, extra, improvements);

    res.redirect('/burndown');
});


app.use('/', router);

app.listen(8080, () => {
    process.stdout.write(`Starting the ms application on port 8080 with development environment`);
});