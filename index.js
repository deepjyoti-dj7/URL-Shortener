const express = require("express");
const path = require("path");
const { connectDB } = require("./config/database");

const urlRoute = require("./routes/url");
const staticRoute = require("./routes/staticRouter");
const URL = require("./models/url");

const app = express();
const PORT = 7001;

app.set("view engine", "ejs");
app.set("views", path.resolve("./views"));

connectDB().then(() => console.log("Database Connected"));

app.use(express.json());
app.use(express.urlencoded({ extended: false }));

app.get("/test", async (req, res) => {
  const allURLs = await URL.find({});
  return res.render("home", {
    urls: allURLs,
  });
});

app.use("/url", urlRoute);
app.use("/", staticRoute);

app.get("/url/:shortId", async (req, res) => {
  const shortId = req.params.shortId;
  console.log(req.params);
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

app.listen(PORT, () => {
  console.log(`Server is listening at port ${PORT}`);
});
