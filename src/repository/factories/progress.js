const Progress = require('../progress');
const Connection = require('../../database/factories/connection').make();

class ProgressFactory {
    static make() {
        return new Progress(
            Connection
        );
    }
}

module.exports = ProgressFactory;
