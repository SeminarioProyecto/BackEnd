const axios = require("axios");

const axiosClient = axios.create({
    baseUrl: "http://data.fixer.io/api"
});

exports.axiosClient;