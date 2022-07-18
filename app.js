var express=require("express");
var app=express();
app.listen(3000);
var session= require("express-session");
app.use(session({secret:"xyz"}));

app.use(express.static("public"));

app.engine("html" , require("ejs").renderFile);
app.set("view engine", "html");

var homeRouter= require("./routes/home");
var loginRouter= require("./routes/login");

app.use("/", homeRouter);
app.use("/login", loginRouter);

