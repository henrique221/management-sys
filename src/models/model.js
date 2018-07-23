var mysql = require('mysql');

function connect(){
  var con = mysql.createConnection({
    host: "db",
    user: "root",
    password: "password"
  });
  
  con.connect(function (err) {
    if (err) throw err;
    console.log("Connected!");
  });

  con.end((err) => {})

}

connect();

module.exports.connect = connect();