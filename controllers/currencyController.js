// const axiosAPI = require("../config/axios");
// const fixer = require("fixer-api");

// // const endpoint = "http://data.fixer.io/api/latest?access_key=1ccb521b4032264a18661981c468aea2&symbols=HNL,JPY,EUR";

// exports.tomarMoneda = async (req, res, next) => {
//   try {
//     console.log("hola");
//     const data = await fixer.latest({
//       access_key: "1ccb521b4032264a18661981c468aea2",
//       symbols: ["EUR", "USD", "HNL"]
//     });
    
//     res.status(200).send(data);
//   } catch (error) {
//     console.log(error);

//     res.status(422)
//     .send({ error: "Error al traer los datos de las monedas" });
//   }
// };

exports.hola = (req, res, next) => {
  console.log("hola");
  res.send("hola");
}