const express = require("express")
const exphbs = require('express-handlebars');
const bodyParser = require("body-parser");
// const flash = require('express-flash');
// const session = require('express-session');
const pg = require("pg");
const registration = require("./registration");
const { request } = require('express');

const app = express();


app.engine('handlebars', exphbs({ layoutsDir: "views/layouts/" }));
app.set('view engine', 'handlebars');

const Pool = pg.Pool;

// app.use(session({
//     secret : "<add a secret string here>",
//     resave: false,
//     saveUninitialized: true
//   }));

app.use(express.static("public"));
app.use(bodyParser.urlencoded({ extended: true }));
app.use(bodyParser.json());

let useSSL = false;
let local = process.env.LOCAL || false;
if (process.env.DATABASE_URL && !local){
    useSSL = true;
}
const connectionString = process.env.DATABASE_URL || 'postgresql://codex:pg123@localhost:5432/registration';
console.log(connectionString)

const pool = new Pool({
    connectionString,
    ssl : {
      rejectUnauthorized: false
    }
  });
  const reg = registration(pool)


  app.get("/",async function(req,res){

    var display = await reg.displayReg()

  

    res.render("index",{
      regList : display
    })
  });


app.get("/reg_numbers", async function(req,res){
  var display = await reg.displayReg()
  // var num = req.body.regNum
    // await reg.displayReg()
    // console.log(display);
    res.render("index",{
      regList : display
    })
});


app.post("/reg_numbers",async function(req,res){
  var num = req.body.regNum
 await reg.addregNum(num)


  res.redirect("/")
});

app.post("/towns",async function(req,res){
   var radioTown = req.body.city
  var regies = await reg.filterTown(radioTown)
  
res.render('index', {
  regList : regies
})
});

app.get("/reset", async function(req,res){
  await reg.remove()
  res.redirect("/")
});


const PORT = process.env.PORT || 3001;

app.listen(PORT, function () {
    console.log("App started at port:", PORT)
});
