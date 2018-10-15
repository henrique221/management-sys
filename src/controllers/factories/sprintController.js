const SprintController = require('../sprintController')
const SprintRepository = require('../../repository/factories/sprint').make();

class SprintControllerFactory {
    static make() {
        return new SprintController(
            SprintRepository
        )
    }
}

module.exports = SprintControllerFactory;
