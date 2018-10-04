const ProgressController = require('../progressController');
const ProgressRepository = require('../../repository/factories/progress').make();

class ProgressControllerFactory {
    static make() {
        return new ProgressController(
            ProgressRepository
        )
    }
}

module.exports = ProgressControllerFactory
