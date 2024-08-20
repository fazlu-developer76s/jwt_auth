const { v4 : uuidv4} = require("uuid"); 
const User = require("../models/user");
const { setUser } = require("../service/auth");

async function handleUserSignup(req, res) {
  // res.status(200).json(req.body);
  try {
    const { name, email, password } = req.body;
    await User.create({
      name: name,
      email: email,
      password: password,
    });
    return res.render("home");
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
}

async function handleUserLogin(req, res) {
  const { email, password } = req.body;
  const user = await User.findOne({ email, password });
  
  if (!user) {
    return res.render("login", {
      error: "invalid username or password",
    });
  
  }
    const token =  setUser(user);
    res.cookie("uid",token);
    return res.redirect("/");
  
  
}

module.exports = {
  handleUserSignup,
  handleUserLogin,
};
