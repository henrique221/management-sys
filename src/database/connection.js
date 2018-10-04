class Connection {
    constructor(mysql) {
        this.mysql = mysql;
    }

    connect() {
        const connection = this.mysql.createConnection(
            {
                host: process.env.DB_HOST,
                user: process.env.DB_USER,
                database: process.env.DB_NAME,
                password: process.env.DB_PASSWORD
            }
        );

        connection.connect(function (err) {
            if (err) {
                console.error('Error connecting ' + err);
            } else {
                console.info('MySql connected to ' + connection.config.host + ':' + connection.config.port);
            }
        });
        connection.on('error', () => console.error('faiou'));
        return connection;
    }
}

module.exports = Connection
