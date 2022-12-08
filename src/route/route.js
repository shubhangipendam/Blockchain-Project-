const express = require('express');
const router = express.Router();
const UserController= require("../controller/cryptoController")


router.get("/getCryptocurrency", UserController.getCrypto)

module.exports = router;