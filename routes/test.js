const express = require("express");
const { handleTest } = require("../controllers/test");

const router = express.Router();

router.get("/test", handleTest);

module.exports = router;
