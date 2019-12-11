const passport = require("passport");
const LocalStrategy = require("passport-local").Strategy;
const mongoose = require("mongoose");
const Usuario = mongoose.model("Usuario");

// Configurar la estrategia
passport.use(
    new LocalStrategy(
        {
            usernameField: "email",
            passwordField: "password"
        },
        async (email, password, done) => {
            const usuario = await Usuario.findOne({ email });

            if (!usuario) {
                return done(null, false, {
                    message: ["El correo electrónico no es válido"]
                });
            }

            const verificarPassword = usuario.compararPassword(password);

            if (!verificarPassword) {
                return done(null, false, {
                    message: ["Contraseña incorrecta"]
                });
            }

            return done(null, usuario);
        }
    )
);

passport.serializeUser((usuario, done) => done(null, usuario._id));

passport.deserializeUser(async (id, done) => {
    const usuario = await Usuario.findById(id).exec();

    return done(null, usuario);
});

module.exports = passport;