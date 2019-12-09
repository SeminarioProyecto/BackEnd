const express = require("express");
const router = express.Router();
const currencyController = require("../controllers/currencyController");
const currencyHistoryController = require("../controllers/currencyHistoryController");

module.exports = function () {
    // Rutas para modulo de moneda actual
    // Mostrar todas las monedas
    router.get("/currencies", currencyController.mostrarMonedas);

    // Mostrar una moneda
    router.get("/currency/:codigoMoneda", currencyController.mostrarMoneda)

    // Agregar nueva moneda
    router.post(
        "/newCurrency", currencyController.nuevaMoneda);

    // Actualizar a los valores actuales de las monedas 
    router.put("/updateCurrency", currencyController.actualizarMoneda);

    // Eliminar moneda
    router.delete("/deleteCurrency/:codigoMoneda", currencyController.eliminarMoneda);

    // Conversion
    router.get("/conversion", currencyController.convertirMoneda);

    // Rutas para modulo de historico de moneda
    // Mostrar historico de moneda
    router.get("/currencyHistory", currencyHistoryController.mostrarHistoricoMonedas);

    // Agregar un historico
    router.post("/newHistoric", currencyHistoryController.agregarHistorico);

    return router;
}