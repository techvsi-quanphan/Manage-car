var express = require("express");

var router = express.Router();

router.use("/admin",require (__dirname +"/admin"));
// router.use("/blog",require(__dirname +"/blog"));

module.exports=router;

