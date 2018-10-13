class Sprint {
    constructor (
        connection
    ) {
        this.connection = connection
    }

    selectSprintFromSprintTable(callback) {
        this.connection.query(
            `SELECT * FROM sprint`,
            function(err, results) {
                if (err) {
                    console.error('error connecting: ' + err.stack);
                    return log(`Query failed`, err, query);
                } else {
                    callback(results);
                }
            }
        );
    }
}

module.exports = Sprint;
