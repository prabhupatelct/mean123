var express=require("express");
var router = express.Router();

router.get("/", (req,res)=>{
res.render("home");
});

router.get("/add", (req,res)=>{
res.cookie("username","admin").send("cookie created ");
});

router.get("/show", (req,res)=>{
x=req.cookies.username;
res.send("Hello " + x );
});
module.exports=router;