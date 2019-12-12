const Usuario = require("../models/Usuario");

function comparePassword(candidate, password) {
    if (candidate === password) {
        return true
    } else {
        return false
    }
};

exports.verificarUsuario = async (req, res, next) => {
    try {
        const usuario = await Usuario.findOne({
            email: req.params.email
        });

        const userValidation = comparePassword(req.params.password, usuario.password);

        if (!userValidation) {
            res
                .status(404)
                .send({
                    mensaje: 'Correo electrónico o contraseña incorrecta!'
                });
        } else {
            res.status(200).send({
                mensaje: 'Haz ingresado con tu cuenta'
            });
        }
    } catch (error) {
        console.log(error);
        res
            .status(422)
            .send({ error: 'Error al intentar iniciar sesión' });
    }
};