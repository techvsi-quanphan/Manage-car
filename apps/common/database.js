var config = require("config");
var mysql = require("mysql");

var connection = mysql.createConnection({
    host     : config.get("mysql.host"),
    user     : config.get("mysql.user"),
    password : config.get("mysql.password"),
    database : config.get("mysql.database"),
    port:config.get("mysql.port")
  });
  connection.connect(function (err) {
    if (err) {
     console.log("not connected");
     throw err.stack;
     
    }
    console.log("Connected to MySQL!");
  });
  
  // Hàm để lấy kết nối đã thiết lập
  function getConnection() {
    if (connection) {
      return connection;
    }
  }
  module.exports={
    getConnection:getConnection
  }

  // connection.connect();

  // function getConnection(){
  //   if(connection){
        
  //       console.log("Coneect success");

  //       return connection;
  //   }
   
  // }
  // module.exports={
  //   getConnection:getConnection
  // }
