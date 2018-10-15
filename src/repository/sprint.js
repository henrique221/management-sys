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

    updateSprintDayAmount(sprintId, dayAmount) {
        this.connection.query(
            `UPDATE sprint SET days = ${dayAmount} WHERE sprint.id = ${sprintId}` ,
            function (err) {
                if(err) {
                    throw(err);
                }
            }
        )
    }
}

module.exports = Sprint;
