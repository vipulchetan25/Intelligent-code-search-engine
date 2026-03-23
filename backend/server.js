const express = require("express");
const mongoose = require("mongoose");
const cors = require("cors");

const app = express();
app.use(cors());
app.use(express.json());

mongoose
  .connect("mongodb://127.0.0.1:27017/codeSearchDB")
  .then(() => console.log("MongoDB Connected"))
  .catch((err) => console.log(err));

const Code = mongoose.model("Code", {
  title: String,
  language: String,
  code: String,
});

app.delete("/deleteAll", async (req, res) => {
  await Code.deleteMany({});
  res.json({ message: "All data deleted" });
});

app.post("/add", async (req, res) => {
  console.log("Request received:", req.body);
  const newCode = new Code(req.body);
  await newCode.save();
  res.send("Code Added");
});

app.get("/search", async (req, res) => {
  const query = req.query.q;
  const results = await Code.find({
    title: { $regex: query, $options: "i" },
  });
  res.json(results);
});

app.listen(5000, () => console.log("Server running on port 5000"));
