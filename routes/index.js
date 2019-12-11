const express = require("express");
const router = express.Router();
const { check } = require("express-validator");
const currencyController = require("../controllers/currencyController");
const currencyHistoryController = require("../controllers/currencyHistoryController");
const usuarioController = require("../controllers/usuarioController");

module.exports = function () {
    // Rutas para modulo de moneda actual
    // Mostrar todas las monedas
    router.get("/currencies", currencyController.mostrarMonedas);

    // Mostrar una moneda
    router.get("/currency/:codigoMoneda", currencyController.mostrarMoneda);

    // Agregar nueva moneda
    router.post(
        "/newCurrency",
        currencyController.uploadFile,
        currencyController.nuevaMoneda);

    // Actualizar a los valores actuales de las monedas 
    router.put("/updateCurrencies", currencyController.actualizarMoneda);

    // Actualizar los datos de una moneda
    router.put("/updateCurrency/:codigoMoneda", currencyController.actualizarMoneda);

    // Eliminar moneda
    router.delete("/deleteCurrency/:codigoMoneda", currencyController.eliminarMoneda);

    // Conversion
    router.get("/conversion/:monedaOrigen/:monedaDestino/:cantidad", currencyController.convertirMoneda);

    // Rutas para modulo de historico de moneda
    // Mostrar historico de moneda
    router.get("/currencyHistory", currencyHistoryController.mostrarHistoricoMonedas);

    // Agregar un historico
    router.post("/newHistoric", currencyHistoryController.agregarHistorico);

    // Rutas para modulo de usuario
    // Agregar nuevo usuario
    router.post(
        "/newUser",
        [
            check("email", "Ingresa tu correo electrónico")
                .not()
                .isEmpty()
                .escape(),
            check("email", "Ingresa un correo electrónico válido")
                .isEmail()
                .normalizeEmail(),
            check("username", "Ingresa tu nombre de usuario")
                .not()
                .isEmpty(),
            check("password", "Ingresa una contraseña para tu usuario")
                .not()
                .isEmpty(),
            check("confirmpassword", "Confirma tu contraseña")
                .not()
                .isEmpty(),
            check(
                "confirmpassword",
                "Las contraseñas no coinciden"
            ).custom((value, { req }) => value === req.body.password)
        ],
        usuarioController.uploadFile,
        usuarioController.nuevoUsuario
    );

    // Mostrar datos de un usuario
    router.get("/user/:idUsuario", usuarioController.mostrarUsuario);

    // Actualizar datos de usuario
    router.put(
        "/updateUser/:idUsuario",
        usuarioController.uploadFile,
        usuarioController.actualizarUsuario);

    // Eliminar usuario
    router.delete("/deleteUser/:idUsuario", usuarioController.eliminarUsuario);

    return router;
}