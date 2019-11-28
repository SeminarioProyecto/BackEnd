const express = require("express");
const router = express.Router();
const currencyController = require("../controllers/currencyController");

module.exports = function() {
    router.get("/", currencyController.hola);

    // router.get("/currency", currencyController.tomarMoneda);

    return router;
};