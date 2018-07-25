var mysql = require('mysql');

var con = mysql.createConnection({
  host: "db",
  user: "root",
  database: "burndown",
  password: "password"
});

function insertSprint(sprint) {
  con.connect(function (err) {
    if (err) throw err;
    con.query(`
      INSERT INTO sprint 
      (nome, start_date, end_date, total_tasks)
      VALUES ('${sprint.nome}',
      '${sprint.startDate}',
      '${sprint.endDate}',
      '${sprint.totalTasks}'
      )`,
      function (err, fields) {
        if (err) throw err;

      }
    );
  });
}

function insertProgresso(progresso) {
  con.connect(function (err) {
    if (err) throw err;
    con.query(`
      INSERT INTO progresso 
      (id_sprint, data, remaining_tasks, bugs, improvements, extra_tasks) 
      VALUES (
        ${progresso.idSprint}, 
        '${progresso.data}', 
        ${progresso.remainingTasks}, 
        ${progresso.bugs}, 
        ${progresso.improvements}, 
        ${progresso.extraTasks}
      )`,
      function (err, rows) {
        if (err) throw err;

      }
    );
  });
}

function selectProgresso(callback) {
  con.connect(function (err) {
    if (err) throw err;
    con.query(`SELECT * FROM progresso`,
      function (err, rows) {
        if (err) {
          callback(err, null)
        } else
          callback(null, rows);
      }

    );
  });
}



module.exports.insertSprint = insertSprint;
module.exports.insertProgresso = insertProgresso;
module.exports.selectProgresso = selectProgresso;