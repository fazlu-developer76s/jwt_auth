const express = require('express');
const URL = require("../models/url");
const router = express.Router();



router.get("/", async (req,res)=>{
    if(!req.user) return res.redirect("/login");
    const all_url = await URL.find({createdBy : req.user._id});
    return res.render("home",{
        urls:all_url,
    });
}); 

router.get("/signup",(req,res)=>{
    res.render("signup");
});
router.get("/login",(req,res)=>{
    res.render("login");
});

module.exports = router;