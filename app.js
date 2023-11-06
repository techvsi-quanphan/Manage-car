var express = require("express");
var config = require("config");
var bodyParser = require("body-parser");
var session = require("express-session");


var app=express();


app.use(bodyParser.json());//xử lí dữ liệu dạng JSON gửi đến từ các yêu cầu HTTp
app.use(bodyParser.urlencoded({extended:true}));
app.set('trust proxy');// cấu hình ứng dụng để tin tưởng proxy server,đây là 1 tùy chọn bảo mật cho phiên session.
app.use(session({
    secret:config.get("secret key"),
    resave:false,
    saveUninitialized:true,
    cookie:{secure:true}
}));

app.set("views",__dirname+ "/apps/views");// đặt thư mục chứa các tệp giao diện người dùng là (views) chứa đường dẫn car_management/apps/view

app.set("view engine","ejs");

app.use("/static",express.static(__dirname + "/public"));

var controllers = require(__dirname + "/apps/controllers");
app.use(controllers);
// var port = 3000;
// var host = "0.0.0.0";
var port = config.get("server.port");
var host = config.get("server.host");
app.listen(port,host,function(){
    console.log("server running on port",port);
});
