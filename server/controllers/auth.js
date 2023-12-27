const express = require("express");
const router = express.Router();
const bcrypt = require("bcrypt");
const nodemailer = require("nodemailer");
const User = require("../Models/User");

const Register = async (req, res) => {
  const { username, email, password } = req.body;

  if (!username || !email || !password) {
    return res.status(401).json({ mess: "pls fill all fields" });
  }

  try {
    const hashedPassword = await bcrypt.hash(password, 10);
    console.log(hashedPassword);
    const newUser = new User({ username, email, password: hashedPassword });
    console.log("hi");
    await newUser.save();
    res.status(201).json({ mess: "user added" });
  } catch (err) {
    console.log(err);
    res.json({ err });
  }
};

const Login = async (req, res) => {
  const { email, password } = req.body;
  try {
    const ema = await User.findOne({ email: email });
    if (ema) {
      const pass = await bcrypt.compare(password, ema.password);
      if (pass) {
        res.status(200).json(ema);
      } else {
        res.status(400).json({});
      }
    } else {
      res.status(400).json({ mess: "invalid credentials" });
    }
  } catch (err) {
    res.status(401).json({ err: "something went wrong" });
  }
};

const updatePass=async (req,res)=>{
  const {email,password}=req.body;
  try{
    const ue = await User.findOne({email})
        if (ue) {
          const hashedPassword = await bcrypt.hash(password, 10);
            ue.password=hashedPassword;
            await ue.save()
            res.status(200).json({mess:'password updated successfully'})
        }
        else{
          return res.status(400).json({mess:'user not found'})
        }
  }catch(e){
    res.json({})
  }
}

const sendmail = async (req, res) => {

  const { email, message } = req.body;
  let transporter = nodemailer.createTransport({
    service: "gmail",
    port: 465,
    secure: true,
    auth: {
      user: "prashantpal2468@gmail.com",
      pass: "sopzualsmuirgimo",
    },
  });

  const ue = await User.findOne({ email: email });
  if (!ue) {
    return res.status(400).json({mess: "you dont have an account"});
  }
  let mailOptions = {
    from: "prashantpal2468@gmail.com",
    to: email,
    subject: "Email from Prashant",
    text: message,
  };

  transporter.sendMail(mailOptions, (error, info) => {
    if (error) {
      console.log(error);
      res.status(400).json({});
    } else {
      console.log("Email sent: " + info.response);
      res.status(200).json({});
    }
  });
};

module.exports = { Register, Login, sendmail, updatePass};
