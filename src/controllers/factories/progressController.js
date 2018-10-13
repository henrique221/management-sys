const ProgressController = require('../progressController');
const ProgressRepository = require('../../repository/factories/progress').make();
const DateService = require('../../services/factories/dateserviceFactory').make();
const SprintRepository = require('../../repository/factories/sprint').make();

class ProgressControllerFactory {
    static make() {
        return new ProgressController(
            ProgressRepository,
            DateService,
            SprintRepository
        )
    }
}

module.exports = ProgressControllerFactory
