const express = require("express");
const validateToken = require("../middlewares/Authentication");
const router = express.Router();

router.get("/", validateToken, async (req, res) => {
    res.json(req.user);
});


module.exports = router;