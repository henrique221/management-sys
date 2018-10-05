class Progress {
    constructor(
        connection
    ) {
        this.connection = connection;
    }

    delete(progressId) {
        this.connection.query(
            `DELETE FROM progresso WHERE id_progresso = ${progressId}`,
            function (err, rows) {
                if (err) {
                    console.error('error connecting: ' + err.stack);
                    return log(`Query failed`, err, query);
                } else {
                    callback(null, rows);
                }
            }
        );
    }
    selectAll(sprintId, callback) {
        this.connection.query(
            `SELECT * FROM progresso WHERE id_sprint = ${sprintId}`,
            function (err, rows) {
                if (err) {
                    console.error('error connecting: ' + err.stack);
                    return log(`Query failed`, err, query);
                } else
                    callback(null, rows)
            }
        )
    }
}

module.exports = Progress