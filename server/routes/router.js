const express = require("express");
const { Register, Login ,sendmail,updatePass} = require("../controllers/auth.js");
const {getTasks, deleteTask, addTask, updateTask } = require("../controllers/task.js");

const router = express.Router();

router.post("/signin", Login);
router.post("/signup", Register);
router.post("/sendmail", sendmail);
router.post("/addTask", addTask);
router.post("/getTasks", getTasks);
router.post("/updatePass", updatePass);
router.post("/deleteTask", deleteTask);
router.post("/updateTask", updateTask);

module.exports = router;
