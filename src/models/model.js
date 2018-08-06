var mysql = require('mysql');

var config =  {
  host     : 'db',
  user     : 'root',
  database : 'burndown',
  password : 'password',
};

var connection = connect();

function connect() {
  var connection = mysql.createConnection(config);
  connection.connect(function(err) {
    if(err){
      console.info('Error connecting ' +err);
      errorHandler(err);
    }else{
      console.info('MySql connected to ' + connection.config.host + ':' + connection.config.port);  
    }
  });
  connection.on('error', errorHandler);
  return connection;
}

function errorHandler(err) {
  console.info('MySQL error ' + err);
  if (err.code === 'PROTOCOL_CONNECTION_LOST') {
      console.info('MySQL connection lost. Reconnecting.');
      connection = connect();
  } else if (err.code === 'ECONNREFUSED') {
      console.info('MySQL connection refused. Trying again in 3 seconds.');
      setTimeout(function() {
          connection = connect();
      }, 3000);
  }
} 

function query() {
  var start = Date.now();
  return connection.query.apply(connection,arguments);
}

function close() {
  connection.end();
}

function insertSprint(sprint) {
  connection.query(`
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
}

function insertProgresso(progresso) {
  connection.query(`
      INSERT INTO progresso 
      (id_sprint, data, remaining_tasks, bugs, improvements, extra_tasks) 
      VALUES (
        ${progresso.idSprint}, 
        '${progresso.data}', 
        ${progresso.remainingTasks}, 
        ${progresso.bugs}, 
        ${progresso.improvements}, 
        ${progresso.extra}
      )`,
    function (err, rows) {
      if (err) throw err;

    }
  );
}

function selectProgresso(callback) {
  connection.query(`SELECT * FROM progresso`, function (err, rows) {
    if (err) {
      console.error('error connecting: ' + err.stack);
      return;
    } else
    callback(null, rows);
  }
);
}

function selectProgressoSprint(id, callback) {
  connection.query(`SELECT * FROM progresso INNER JOIN sprint on progresso.id_sprint = sprint.id where sprint.id = ${id}`, function (err, rows) {
    if (err) {
      console.error('error connecting: ' + err.stack);
      return log(`Query failed`, err, query);
    } else
    callback(null, rows);
    }
  );
}

function insertSprint(sprint) {
  connection.query(`
      INSERT INTO sprint 
      (nome, start_date, end_date, total_tasks) 
      VALUES (
        '${sprint.nome}', 
        '${sprint.date}', 
        '${sprint.endDate}',
        ${sprint.tasks}
      )`,
    function (err, rows) {
      if (err) throw err;

    }
  );
}

function selectSprint(callback) {
  connection.query(`SELECT * FROM sprint`, function(err, rows){
    if (err) {
      callback(null, rows);
    } else 
      callback(null, rows);
  })
} 


module.exports.insertSprint = insertSprint;
module.exports.insertProgresso = insertProgresso;
module.exports.selectProgresso = selectProgresso;
module.exports.selectSprint = selectSprint;
module.exports.insertSprint = insertSprint;
module.exports.selectProgressoSprint = selectProgressoSprint;