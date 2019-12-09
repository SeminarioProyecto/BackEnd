const Currency = require("../models/Currency");
const CurrencyHistory = require("../models/CurrencyHistory");

exports.agregarHistorico = async (req, res, next) => {
    try {
        const currency = await Currency.find({});

        const date = await CurrencyHistory.findOne({
            date: currency[0].date
        })

        if (date === null) {
            currency.forEach(function (moneda, i) {
                agregarHistorico(moneda);
            });
        } else {
            const today = new Date();

            const dateComparison = date.date.toString();

            if (dateComparison.substring(4, 15) != today.toString().substring(4, 15)) {
                currency.forEach(function (moneda, i) {
                    agregarHistorico(moneda);
                });
                res.status(200).send({ mensaje: 'done' });
            }
        }
    } catch (error) {        
        res
            .status(422)
            .send({ mensaje: 'Error al ingresar los historicos de moneda' });
    }
};

async function agregarHistorico(moneda) {
    var currencyHistory = new CurrencyHistory();
    currencyHistory.currencyCode = moneda.codigoMoneda;
    currencyHistory.rate = moneda.rate;
    currencyHistory.date = moneda.date;

    await currencyHistory.save();
};

exports.mostrarHistoricoMonedas = async (req, res, next) => {
    try {
        const today = new Date();
        console.log(today.toString().substring(4, 15));

        const currencyHistory = await CurrencyHistory.find({});

        res.status(200).send({ result: currencyHistory });
    } catch (error) {
        res
            .status(422)
            .send({
                mensaje: 'Error al obtener los históricos de las monedas'
            });
    }
};

exports.mostrarHistoricoMoneda = async (req, res, next) => {
    try {
        const currencyHistory = await CurrencyHistory.find({
            currencyCode: req.params.currencyCode
        });

        res.status(200).send({ result: currencyHistory });
    } catch (error) {
        res
            .status(422)
            .send({
                mensaje: 'Error al obtener historico de la moneda'
            });
    }
};