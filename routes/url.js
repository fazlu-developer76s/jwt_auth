const express = require("express");
const router = express.Router();
const { handleGenrateNewShortURL,handleGetAnalytics } = require("../controllers/url")

router.post('/',handleGenrateNewShortURL);
router.get('/analytics/:shortId',handleGetAnalytics);
module.exports = router;