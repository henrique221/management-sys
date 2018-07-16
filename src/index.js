const express = require('express');
const path = require('path');
const swig = require('swig');

const app = express();
const router = express.Router();

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

app.use('/', router);

app.listen(8080, () => {
    process.stdout.write(`Starting the ms application on port 8080 with development environment`);
});