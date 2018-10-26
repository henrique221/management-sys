const moment = require('moment');
const DateService = require('../dateService');

class DateServiceFactory {
    static make() {
        return new DateService(
            moment
        );
    }
}

module.exports = DateServiceFactory;
