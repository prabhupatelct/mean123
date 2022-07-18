const { getEventListeners } = require("events");
var express=require("express");
var router = express.Router();
var mongoose = require("mongoose");
mongoose.connect("mongodb://localhost:27017/mydb7");
var con=mongoose.connection;
var schema=mongoose.Schema({username: String, password: String, role: String});
var m1=mongoose.model("m1", schema, "login2" );

router.get("/", (req,res)=>{
res.render("login", {msg:""});
});

router.get("/check", (req,res)=>{
m1.find(req.query, function(err, data){
x=0;
x= data.length ;
if(x == 1)
{
req.session.username= data[0].username;
 req.session.role= data[0].role;
res.render("users", {username: data[0].username , role: data[0].role});
}
else
{
res.render("login", { msg: "Invalid user id & password"} );
}
});
});


router.get("/logout", (req,res)=>{ 
req.session.destroy();
res.render("login", { msg : " you are logout, logi agian "});
});

router.get("/show", (req,res)=>{ 

res.render("show", {username : req.session.username , role: req.session.role });
});

router.get("/reg", function(req, res){
res.render("register");
});
router.get("/reg2", function(req, res){
r1=new m1(req.query);
r1.save();
res.send("successfully registered ");
});
router.get("/change",(req,res)=> {
    if(req.session.username )
    res.render("change", { username:req.session.username});
    else
    res.render("login" ,{msg: "login again"});
});
router.get("/change2") ,(req,res)=>{
    m1.update{username:req.query.username,password:
    req.query.oldpassword},{$set:{password:req.query.newpassword}},
    function(err,result){
        res.send(result);
    });
    
});

module.exports=router;