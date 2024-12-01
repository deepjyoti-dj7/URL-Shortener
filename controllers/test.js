const URL = require("../models/url");

async function handleTest(req, res) {
  const allURLs = await URL.find({});
  return res.render("home", {
    urls: allURLs,
  });
}

module.exports = { handleTest };
