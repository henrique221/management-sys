class DateService {
    constructor (
        moment
    ) {
        this.moment = moment;
    }
    
    simpleFormat(date, format) {
        return this.moment(date).format(format)
    }
}

module.exports = DateService;
