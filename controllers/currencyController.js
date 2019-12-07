const fixer = require("fixer-api");
const Currency = require("../models/Currency");

// Agregar una nueva moneda
exports.nuevaMoneda = async (req, res, next) => {
    const currency = new Currency(req.body);

    try {
        await currency.save();

        res.send({
            mensaje: "Moneda agregada"
        });

    } catch (error) {
        console.log(error);

        res
            .status(422)
            .send({
                error: "Ha ocurrido un error al insertar una nueva moneda"
            });
    }
};

// Actualizar valores de las monedas
exports.actualizarMoneda = async (req, res, next) => {
    try {
        const currency = await Currency.findOne();
        const currencyHistory = new CurrencyHistory();

        var today = new Date();

        const dbDate = currency.date.toString();

        if (dbDate.substring(4, 15) != today.toString().substring(4, 15)) {
            console.log('Es falso');
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

                console.log(currencyUpdate);
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

// Mostrar todas las monedas
exports.mostrarMonedas = async (req, res, next) => {
    try {
        const currencies = await Currency.find({});
        res.status(200).send(currencies);
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

        res.status(200).send(currency);
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
            monedaOrigen: req.body.monedaOrigen,
            monedaDestino: req.body.monedaDestino,
            cantidad: req.body.cantidad
        };

        const currencyOrigin = await Currency.find({
            codigoMoneda: datosConversion.monedaOrigen
        });
        const currencyDestination = await Currency.find({
            codigoMoneda: datosConversion.monedaDestino
        });

        const conversion = (currencyDestination[0].rate / currencyOrigin[0].rate) * datosConversion.cantidad;

        res.status(200).send(conversion.toString());
    } catch (error) {
        res
            .status(422)
            .send({
                mensaje: 'Error al realizar la conversion'
            });
    }
};