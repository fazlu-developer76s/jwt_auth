const express = require("express");
const { connectToMongoDB } = require("./connect");
const {restrictToLoggedinUserOnly,checkAuth } = require(".//middlewares/auth");
const URL = require(".//models/url");

const urlRoute = require("./routes/url");
const staticRoute = require("./routes/staticRouter");
const UserRoute = require("./routes/user");
const path = require("path");
const cookieParser = require("cookie-parser");
const app = express();
const PORT = 5000;
connectToMongoDB("mongodb://localhost:27017/short-url").then(() => {
  console.log("mongodb connected");
});
app.set("view engine", "ejs");
app.set("views", path.resolve("./views"));
app.use(express.json());
app.use(express.urlencoded({ extended: false }));
app.use(cookieParser());

app.use("/url",restrictToLoggedinUserOnly, urlRoute);
app.use("/",checkAuth, staticRoute);
app.use("/user",UserRoute);
app.get("/url/:shortId", async (req, res) => {
    const shortId = req.params.shortId;
    const entry = await URL.findOneAndUpdate(
      {
        shortId,
      },
      {
        $push: {
          visitHistory: {
            timestamp: Date.now(),
          },
        },
      }
    );
    res.redirect(entry.redirectURL);
  });
app.listen(PORT, () => console.log(`server starting ${PORT}`));
