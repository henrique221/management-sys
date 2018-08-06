'use strict'

const express = require('express');
const bodyParser = require('body-parser')
const path = require('path');
const swig = require('swig');

const app = express();
const router = express.Router();
const moment = require('moment')
const business = require('moment-business')
const fs = require('fs')



const {
    insertSprint,
    insertProgresso,
    selectProgresso,
    selectProgressoSprint,
    selectSprint
} = require('./models/model')

app.use(bodyParser.urlencoded({
    extended: false
}))

app.engine('html', swig.renderFile);
app.set('view engine', 'html');
app.set('views', path.join(__dirname, '/views/'));
app.use('/static', express.static(path.join(__dirname, '../public/')));

router.get('/home', (req, res) => {
    res.render(
        'index.html', {}
    );
});

router.get('/burndown(/:id)?', function (req, res, next) {
    if (req.params.id == null || req.params.id == 'undefined') {
        res.redirect('sprint')
    } else {
        selectProgressoSprint(function (err, content) {
            if (err) {
                next(err)
                res.status(500)
            } else {
                var totalTasks = 35;
                var dayAmount = 11;
                var title = 'New Sprint'
                var now = new Date();
                var dateMoment = moment(now).format('YYYY-MM-DD')
                var items = {}
                var sprints = []

                for (var item of content) {
                    sprints.push({id : item.id, nome : item.nome})
                }
                console.log(sprints)

                for (const item of content) {
                    var date = moment(item.data)
                    items[date.format("DD-MM-YYYY")] = item
                }
                var singleDay = moment([2018, 6, 15]);
                var datas = []
                var dayCount = singleDay
                for (let day = 0; datas.length <= dayAmount; day++) {
                    if (business.isWeekDay(dayCount)) {
                        datas.push(dayCount.format('DD/MM ddd'))
                        dayCount = moment(dayCount).add(1, "days")
                    } else {
                        business.addWeekDays(dayCount, 1)
                    }
                }
                selectSprint(req.params.id, function (err, results) {
                    if (err) {
                        next(err)
                    } else {
                        var nomeSprint = results[0].nome
                        console.log(nomeSprint)
                    }


                    res.render(
                        'burndown.html', {
                            items,
                            date,
                            datas,
                            title,
                            dateMoment,
                            totalTasks,
                            dayAmount,
                            nomeSprint,
                            sprints
                        }
                    )
                })
            }
        })

    }
});

router.post('/burndown/:id', (req, res) => {
    var data = {}
    data.table = []
    console.log(req.params.id)
    var progresso = {
        idSprint: req.params.id,
        date: null,
        remainingTasks: null,
        bugs: null,
        improvements: null,
        extraTasks: null
    }
    var dataSprint = {
        nome: null,
        date: null,
        endDate: null,
        tasks: null
    }


    progresso.data = req.body.date;
    progresso.remainingTasks = req.body.remaining;
    progresso.bugs = req.body.bugs;
    progresso.extra = req.body.extra;
    progresso.improvements = req.body.improvements

    dataSprint.date = req.body.initialDate;
    dataSprint.nome = req.body.nome;
    req.body.dias = moment(dataSprint.date).add(req.body.dias, 'days').format('YYYY-MM-DD')
    dataSprint.endDate = req.body.dias
    dataSprint.tasks = req.body.tasks;
    console.log(req.body)
    if (progresso.data || progresso.remainingTasks || progresso.bugs || progresso.bugs || progresso.improvements) {
        insertProgresso(progresso)
    }
    if (dataSprint.dias || dataSprint.tasks) {
        insertSprint(dataSprint)
    }

    if (!req.body) {
        console.log('nothing to submit')
    };

    res.redirect(`/burndown/${req.params.id}`);
});

router.get('/sprint', (req, res) => {
    var day = new Date();
    var dateMoment = moment(day).format('YYYY-MM-DD')
    res.render(
        'sprint.html', {
            dateMoment
        }
    );
});


app.use('/', router);

app.listen(8080);