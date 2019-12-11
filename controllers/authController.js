const passport = require("passport");
const mongoose = require("mongoose");

exports.autenticarUsuario = passport.authenticate("local", {
    successMessage: ["Ingresaste"]
});

exports.verificarUsuario = (req, res, next) => {
    if (req.isAuthenticated()) {
        return next();
    }
};