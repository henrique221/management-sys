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
    selectSprint,
    selectSprintName,
} = require('./models/model')


app.use(bodyParser.urlencoded({
    extended: false
}))

app.engine('html', swig.renderFile);
app.set('view engine', 'html');
app.set('views', path.join(__dirname, '/views/'));
app.use('/static', express.static(path.join(__dirname, '../public/')));

router.get('/home', (req, res) => {
    selectSprint(function (err, results) {
        if (err) {
            next(err)
        } else {
            var results = results
        }
        module.exports.results = selectSprint
        res.render(
            'index.html', {
                results
            }
        );
    })
})


router.get('/burndown(/:id)?', function (req, res, next) {
    if (req.params.id == null || req.params.id == 'undefined') {
        res.redirect('home')
    } else {
        selectProgressoSprint(req.params.id, function (err, content) {
            if (err) {
                next(err)
                res.status(500)
            } else {
                try {
                    var totalTasks = content[0].total_tasks;
                    var dayAmount = content[0].days;
                    var ideal = []
                    var tt = totalTasks
                    for (let i = dayAmount; i >= 0; i--) {
                        if (i == dayAmount) {
                            ideal.push(tt)
                        }
                        if (i == 1) {
                            ideal.push(0)
                        } else {
                            ideal.push(NaN)
                        }
                    }
                    var title = 'New Sprint'
                    var now = new Date();
                    var dateMoment = moment(now).format('YYYY-MM-DD')
                    var items = {}
                    var nomeSprint = content[0].nome
                    for (const item of content) {
                        var date = moment(item.data)
                        items[date.format("DD-MM-YYYY")] = item
                    }
                    var startDateContent = content[0].start_date
                    var month = startDateContent.getMonth()
                    var year = startDateContent.getFullYear()
                    var day = startDateContent.getDate()

                    var singleDay = moment([year, month, day]);
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
                    var tasksAndDays = []
                    var dateRemaining = []
                    for (let i = 0; i < dayAmount; i++) {
                        if (content[i] && content[i].data) {
                            var dayRemaining = content[i].data.getDate()
                            var monthRemaining = content[i].data.getMonth()
                            var yearRemaining = content[i].data.getFullYear()
                            dateRemaining.push(moment([yearRemaining, monthRemaining, dayRemaining]).format('DD/MM ddd'))
                            content[i].data = dateRemaining[i]
                            tasksAndDays.push({
                                data: dateRemaining[i].data,
                                tasks: content[i].total_tasks
                            })



                        } else {
                            tasksAndDays.push(NaN)
                        }
                    }
                    var includeDate = []
                    for(let i = 0; i<datas.length; i++){
                        includeDate.push(NaN)
                    }
                    for(let i = 0; i<datas.length; i++){
                        if(datas.includes(dateRemaining[i])){
                            includeDate[datas.indexOf(dateRemaining[i])] = datas[datas.indexOf(dateRemaining[i])]
                            // console.log(dateRemaining[i])
                            console.log(datas.indexOf(dateRemaining[i]))
                        }
                    }
                    console.log(content[0])
                    selectSprint(function (err, results) {
                        if (err) {
                            next(err)
                        } else {
                            var results = results
                        }
                        res.render(
                            'burndown.html', {
                                content,
                                date,
                                datas,
                                title,
                                dateMoment,
                                totalTasks,
                                dayAmount,
                                nomeSprint,
                                results,
                                ideal,
                                includeDate
                            }
                        )
                    })
                } catch {
                    res.redirect(`/burndown/progresso/${req.params.id}`)
                }
            }

        })

    }
});

router.post('/burndown/:id', (req, res) => {
    var data = {}
    data.table = []
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
    progresso.date = req.body.date;
    progresso.remainingTasks = req.body.remaining;
    progresso.bugs = req.body.bugs;
    progresso.extra = req.body.extra;
    progresso.improvements = req.body.improvements

    dataSprint.date = req.body.initialDate;
    dataSprint.nome = req.body.nome;
    req.body.dias = moment(dataSprint.date).add(req.body.dias, 'days').format('YYYY-MM-DD')
    dataSprint.endDate = req.body.dias
    dataSprint.tasks = req.body.tasks;

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

router.get('/sprint(/:id)?', (req, res) => {
    selectSprint(function (err, content) {
        if (err) {
            next(err)
        } else {
            var day = new Date();
            var dateMoment = moment(day).format('YYYY-MM-DD')
            var results = content
            var success;
            var text;
            if (req.params.id == 'success') {
                success = true
                text = `Sprint succesfully added`
            }
            res.render(
                'sprint.html', {
                    dateMoment,
                    results,
                    success,
                    text
                }
            );
        }
    })
})
router.post('/sprint(/success)?', (req, res) => {
    var dataSprint = {
        nome: null,
        date: null,
        endDate: null,
        tasks: null
    }
    dataSprint.date = req.body.initialDate;
    dataSprint.nome = req.body.nome;
    dataSprint.endDate = req.body.dias
    dataSprint.tasks = req.body.tasks;
    if (dataSprint.endDate || dataSprint.tasks) {
        insertSprint(dataSprint)
    }
    res.redirect(`/sprint/success`)
});

router.get('/progresso/error', (req, res) => {
    selectSprint(function (err, content) {
        if (err) {
            next(err)
        } else {
            var results = content
            res.render('progresso_error.html', {
                results
            })
        }
    })
})
router.get('/burndown/progresso(/:id)?', (req, res) => {
    if (req.params.id == null || req.params.id == 'undefined') {
        res.redirect('home')
    } else {
        selectSprintName(req.params.id, function (err, content) {
            if (err) {
                next(err)
            } else {
                try {
                    var content = content
                    var now = new Date();
                    var dateMoment = moment(now).format('YYYY-MM-DD')
                    var content = content[0].nome
                    selectSprint(function (err, results) {
                        if (err) {
                            next(err)
                        } else {
                            var results = results
                        }
                        var resp = `Progress in " ${content} " still not registered`
                        res.render(
                            'progresso.html', {
                                content,
                                dateMoment,
                                results,
                                resp
                            }
                        )

                    })
                } catch {
                    res.redirect('/progresso/error')
                }
            }

        })
    }
})

router.post('/burndown/progresso(/:id)?', (req, res) => {
    var progresso = {
        idSprint: req.params.id,
        date: req.body.date,
        remainingTasks: req.body.remaining,
        bugs: req.body.bugs,
        improvements: req.body.improvements,
        extra: req.body.extra
    }
    insertProgresso(progresso)
    res.redirect(`/burndown/${req.params.id}`)
})


app.use('/', router);

app.listen(8080);