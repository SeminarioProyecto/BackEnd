const Currency = require("../models/Currency");
const multer = require("multer");
const shortid = require("shortid");
const fixer = require("fixer-api");

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

// Agregar una nueva moneda
exports.nuevaMoneda = async (req, res, next) => {
    const currency = new Currency(req.body);

    try {
        if (req.file) {
            currency.image = req.file.filename;
        }

        await currency.save();

        res.send({
            mensaje: "Moneda agregada"
        });

    } catch (error) {
        res
            .status(422)
            .send({
                error: "Ha ocurrido un error al insertar una nueva moneda"
            });
    }
};

// Actualizar valores de las monedas
exports.actualizarMonedas = async (req, res, next) => {
    try {
        const currency = await Currency.findOne();

        var today = new Date();

        const dbDate = currency.date.toString();

        if (dbDate.substring(4, 15) != today.toString().substring(4, 15)) {
            // Pedir valores de las monedas a fixer-api
            const data = await fixer.latest({
                access_key: "1ccb521b4032264a18661981c468aea2",
                symbols: ["EUR", "HNL", "USD", "JPY", "MXN", "SVC", "GTQ", "CRC", "PAB", "NIO"]
            });

            const codigoMoneda = ['EUR', 'HNL', 'USD', 'JPY', 'MXN', 'SVC', 'GTQ', 'CRC', 'PAB', 'NIO'];
            const rate = data.rates;

            async function currencyFunction(moneda) {
                const currencyUpdate = await Currency.findOneAndUpdate({
                    codigoMoneda: moneda
                }, {
                    rate: rate[moneda],
                    date: today
                });
                res
                    .status(200)
                    .send({ mensaje: currencyUpdate });
            };

            codigoMoneda.forEach(moneda => {
                currencyFunction(moneda);
            });
        };
    } catch (error) {
        res
            .status(422)
            .send({
                mensaje: 'Error al actualizar las monedas'
            });
    }
};

exports.actualizarMoneda = async (req, res, next) => {
    try {
        let nuevaMoneda = req.body;

        if (req.file) {
            nuevaMoneda.image = req.file.filename;
        } else {
            const monedaAnterior = await Currency.findOne({ codigoMoneda: req.params.codigoMoneda});
            nuevaMoneda.image = monedaAnterior.image;
        }

        const user = await Currency.findOneAndUpdate({
                codigoMoneda: req.params.codigoMoneda
            },
            nuevaMoneda, 
            { new: true }
        );

        res.status(200).send(user);
    } catch (error) {
        console.log(error);

        res
            .status(422)
            .send({
                mensaje: 'Error al actualizar la moneda'
            });
    }
}

// Mostrar todas las monedas
exports.mostrarMonedas = async (req, res, next) => {
    try {
        const currencies = await Currency.find({});
        res.status(200).send({ result: currencies });
    } catch (error) {
        res
            .status(422)
            .send({
                error: "Error al momento de obtener las divisas"
            });
    }
};

// Mostrar una moneda
exports.mostrarMoneda = async (req, res, next) => {
    try {
        const currency = await Currency.findOne({
            codigoMoneda: req.params.codigoMoneda
        });

        if (!currency) {
            res.status(404).send({
                error: "Esta divisa no existe"
            });
        }

        res.status(200).send({ result: currency });
    } catch (error) {
        res
            .status(422)
            .send({
                error: "Error al momento de obtener el cliente"
            });
    }
};

// Eliminar moneda
exports.eliminarMoneda = async (req, res, next) => {
    try {
        await Currency.findOneAndDelete({
            codigoMoneda: req.params.codigoMoneda
        });

        res.status(200).send({
            mensaje: "Moneda eliminada"
        });
    } catch (error) {
        res
            .status(422)
            .send({
                error: "Error al momento de eliminar moneda "
            });
    }
};

exports.convertirMoneda = async (req, res, next) => {
    try {
        const datosConversion = {
            monedaOrigen: req.params.monedaOrigen,
            monedaDestino: req.params.monedaDestino,
            cantidad: req.params.cantidad
        };

        const currencyOrigin = await Currency.find({
            codigoMoneda: datosConversion.monedaOrigen
        });
        const currencyDestination = await Currency.find({
            codigoMoneda: datosConversion.monedaDestino
        });

        const conversion = (currencyDestination[0].rate / currencyOrigin[0].rate) * datosConversion.cantidad;

        res.status(200).send( 
            { result: 
                [
                    {
                        resultado: conversion.toFixed(4).toString(), 
                        symbol: currencyDestination[0].symbol
                    }
                ]
            }
        );
    } catch (error) {
        res
            .status(422)
            .send({
                mensaje: 'Error al realizar la conversion'
            });
    }
};