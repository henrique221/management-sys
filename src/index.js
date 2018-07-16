const express = require('express');
const path = require('path');
const swig = require('swig');

const app = express();
const router = express.Router();

app.engine('html', swig.renderFile);
app.set('view engine', 'html');
app.set('views', path.join(__dirname, '/views/'));

router.get('/app', (req, res) => {
    res.render(
        'sec.html',
        {}
    );
});

app.use('/ms', router);

app.listen(8080, () => {
    process.stdout.write(`Starting the ms application on port 8080 with development environment`);
  });