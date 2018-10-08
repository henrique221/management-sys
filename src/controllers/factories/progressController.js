const ProgressController = require('../progressController');
const ProgressRepository = require('../../repository/factories/progress').make();
const DateService = require('../../services/factories/dateserviceFactory').make();

class ProgressControllerFactory {
    static make() {
        return new ProgressController(
            ProgressRepository,
            DateService
        )
    }
}

module.exports = ProgressControllerFactory
