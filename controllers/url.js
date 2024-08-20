const  shortid  = require("shortid");
const URL  = require("../models/url");
async function handleGenrateNewShortURL(req,res){
    const body = req.body;
    
    if(!body.url) return res.status(400).json({error: 'url is required'});
     const shortId = shortid();
     try{

         await URL.create({
            shortId:shortId,
            redirectURL: body.url,
            visitHistory : [],
            createdBy:req.user._id,
         });
         return res.render("home",{id:shortId});
     }catch(error){
        return res.end({error:error.message});
     }
    //  return res.json({id:shortId});

}

async function handleGetAnalytics(req,res) {
    const shortId = req.params.shortId;
    const result = await URL.findOne({shortId});
    return res.json({
     totalClicks:result.visitHistory.length,
     analytics:result.visitHistory,    
    });
}

module.exports = {
    handleGenrateNewShortURL,
    handleGetAnalytics,
}