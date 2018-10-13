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

    selectAllBySprintId(sprintId, callback) {
        this.connection.query(
            `SELECT * FROM progresso INNER JOIN sprint ON progresso.id_sprint = sprint.id AND progresso.id_sprint = ${sprintId}`,
            function (err, results) {
                if (err) {
                    console.error('error connecting: ' + err.stack);
                    return log(`Query failed`, err, query);
                } else {
                    callback(results);
                }
            }
        )
    }
}

module.exports = Progress;
