const express = require("express");
const routes = require("./routes/router.js");
const dotenv = require("dotenv");
const mongoose = require("mongoose");
const cors = require("cors");
const app = express();
dotenv.config();
const PORT = process.env.PORT || 5000;
app.use(
  cors({
    origin: "http://localhost:5173",
    methods: ["GET", "POST", "PUT", "DELETE"],
    allowedHeaders: ["*"],
  })
);

app.use(express.json());
app.use("/auth", routes);
app.get("/", (req, res) => {
  return res.send("hi from server");
});

const options = {
  useNewUrlParser: true,
  useUnifiedTopology: true,
};
mongoose
  .connect(process.env.mongoURI, options)
  .then(() => {
    app.listen(PORT, () => console.log(`Server Port: ${PORT}`));
    console.log("connected to mongo");
  })
  .catch((err) => {
    console.log("error connecting mongo", err);
  });
