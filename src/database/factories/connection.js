const mysql = require('mysql');
const Connection = require('../connection');

class ConnectionFactory {
    static make() {
        return new Connection(
            mysql
        ).connect();
    }
}

module.exports = ConnectionFactory;
