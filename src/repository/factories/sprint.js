const Sprint = require('../sprint');
const Connection = require('../../database/factories/connection').make();

class SprintFactory {
    static make() {
        return new Sprint (
            Connection
        );
    }
}

module.exports = SprintFactory;
