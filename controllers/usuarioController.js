const Usuario = require("../models/Usuario");
const multer = require("multer");
const shortid = require("shortid");

const configuracionMulter = {
    storage: (fileStorage = multer.diskStorage({
        destination: (req, file, cb) => {
            cb(null, __dirname + "../../uploads");
        },
        filename: (req, file, cb) => {
            const extension = file.mimetype.split("/")[1];
            cb(null, `${shortid.generate()}.${extension}`);
        }
    })),
    fileFilter(req, file, cb) {
        if (file.mimetype === "image/jpeg" || file.mimetype === "image/png") {
            cb(null, true);
        } else {
            cb(new Error("Formato de imagen no válido"));
        }
    }
};

const upload = multer(configuracionMulter).single("imagen");

exports.uploadFile = (req, res, next) => {
    upload(req, res, function (error) {
        if (error) {
            res.status(422).send({
                error
            });
        }
        return next();
    });
};

exports.nuevoUsuario = async (req, res, next) => {
    try {
        const user = new Usuario(req.params);
        
        if (req.file) {
            user.image = req.file.filename;
        }    

        await user.save();

        res
            .status(200)
            .send({ mensaje: "Se agregó un nuevo usuario" });
    } catch (error) {
        res.status(422).send({
            error: "Ha ocurrido un error al agregar el nuevo usuario"
        });
    }
};

exports.mostrarUsuario = async (req, res, next) => {
    try {
        const user = await Usuario.findById(req.params.idUsuario);

        if (!user) {
            res.status(404).send({ error: "No existe el usuario" });
        }

        res.status(200).send(user);
    } catch (error) {
        res
            .status(422)
            .send({ error: "Error al obtener el usuario" });
    }
};

exports.actualizarUsuario = async (req, res, next) => {
    try {
        let nuevoUsuario = req.body;

        if (req.file) {
            nuevoUsuario.image = req.file.filename;
        } else {
            const usuarioAnterior = await Usuario.findById(req.params.idUsuario);
            nuevoUsuario.image = usuarioAnterior.image;
        }

        if (req.params) {
            const user = await Usuario.findOneAndUpdate(
                { _id: req.params.idUsuario },
                nuevoUsuario,
                { new: true }
            );

            res.status(200).send(user);
        } else {
            res
                .status(422)
                .send({ mensaje: 'Introduzca un valor para actualizar su usuario!' });
        }
    } catch (error) {
        res
            .status(422)
            .send({ error: "Error al actualizar los datos del usuario" });
    }
};

exports.eliminarUsuario = async (req, res, next) => {
    try {
        await Usuario.findOneAndDelete({ _id: req.params.idUsuario });

        res.status(200).send({ mensaje: "Se eliminó el usuario" });
    } catch (error) {
        res
            .status(422)
            .send({ error: "Error al eliminar el usuario" });
    }
};