const express = require("express");
const router = express.Router();
const currencyController = require("../controllers/currencyController");
const currencyHistoryController = require("../controllers/currencyHistoryController");

module.exports = function () {
    // Rutas para modulo de moneda actual
    router.get("/currencies", currencyController.mostrarMonedas);

    router.get("/", currencyHistoryController.agregarHistorico);

    router.get("/currency/:codigoMoneda", currencyController.mostrarMoneda)

    router.post("/newCurrency", currencyController.nuevaMoneda);

    router.put("/updateCurrency", currencyController.actualizarMoneda);

    router.delete("/deleteCurrency/:codigoMoneda", currencyController.eliminarMoneda);

    router.get("/conversion", currencyController.convertirMoneda);

    // Rutas para modulo de historico de moneda
    router.get("/currencyHistory", currencyHistoryController.mostrarHistoricoMonedas);

    return router;
}