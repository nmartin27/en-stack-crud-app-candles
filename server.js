const dotenv = require("dotenv");
dotenv.config();

const express = require("express");
const app = express();
const mongoose = require("mongoose");
const methodOverride = require("method-override");

mongoose.connect(process.env.MONGODB_URI);
mongoose.connection.on("connected", () => {
  console.log(`Connected to MongoDB ${mongoose.connection.name}.`);
});

const Candle = require("./models/candles.js");

app.use(express.urlencoded({ extended: false }));
app.use(methodOverride("_method"));

app.get("/", async (req, res) => {
  res.render("home.ejs");
});

app.get("/candles", async (req, res) => {
  const allCandles = await Candle.find();
  res.render("candles/index.ejs", { candles: allCandles });
});

app.get("/candles/new", (req, res) => {
  res.render("candles/new.ejs");
});

app.get("/candles/:candleId", async (req, res) => {
    const foundCandle = await Candle.findById(req.params.candleId);
    //   res.send(`this route: ${req.params.candleId}`)
    res.render("candles/show.ejs", { candle: foundCandle });
  });
  
app.get("/candles/:candleId/edit", async (req, res) => {
  const foundCandle = await Candle.findById(req.params.candleId);
  res.render("candles/edit.ejs", {
    candle: foundCandle,
  });
});

  

  app.post("/candles", async (req, res) => {
    if (req.body.hasPrize === "on") {
      req.body.hasPrize = true;
    } else {
      req.body.hasPrize = false;
    }
    await Candle.create(req.body);
    res.redirect("/candles");
  });

  app.delete("/candles/:candleId", async (req, res) => {
    await Candle.findByIdAndDelete(req.params.candleId);
    res.redirect("/candles");
  });


app.put("/candles/:candleId", async (req, res) => {
    // console.log("Candle ID:", req.params.candleId);
    
  if (req.body.hasPrize === "on") {
    req.body.hasPrize = true;
  } else {
    req.body.hasPrize = false;
  }
  await Candle.findByIdAndUpdate(req.params.candleId, req.body);
  res.redirect(`/candles/${req.params.candleId}`);
});

app.listen(3000, () => {
  console.log("Listening on 3000, Capn!");
});
