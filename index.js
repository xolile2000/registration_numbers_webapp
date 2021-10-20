const express = require("express")
const exphbs = require('express-handlebars');
const bodyParser = require("body-parser");
// const flash = require('express-flash');
// const session = require('express-session');
// const pg = require("pg");
const registration = require("./registration");
const { request } = require('express');


const app = express();
const reg = registration()

app.engine('handlebars', exphbs({ layoutsDir: "views/layouts/" }));
app.set('view engine', 'handlebars');

app.use(express.static("public"));
app.use(bodyParser.urlencoded({ extended: true }));
app.use(bodyParser.json());

 


// app.get("/reg_numbers",function(req,res){
//     var num = req.body.regNum
//     reg.regNum(num)
    
//     res.render("index")
// });

app.post("/reg_numbers",function(req,res){
  
});
const PORT = process.env.PORT || 3001;

app.listen(PORT, function () {
    console.log("App started at port:", PORT)
});
