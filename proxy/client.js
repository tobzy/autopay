"use strict";

const axiosLib = require('axios');
const Config = require("./Config");

let cfg = new Config();

const axios = axiosLib.create({
    baseURL: cfg.baseUrl,
    headers: {
        'Content-Type': 'application/json; charset=utf-8'
    }
});

class Client {

    getBatches(corporateCode) {

        axios.get('/getbatches',{
                params: {
                    corporateCode: corporateCode
                },
                transformResponse: [function (data) {
                    return data;
                }]
            })
            .then(function (response) {
                console.log(response);
            })
            .catch(function (error) {
                console.log(error);
            });
    };

    commitBatch(corporateCode, batchId, passCode) {

        axios.post('/commitbatch',{
            data: {
                corporateCode: corporateCode,
                batchId: batchId,
                passCode: passCode
            },
            transformResponse: [function (data) {
                return data;
            }]
        })
        .then(function (response) {
            console.log(response);
        })
        .catch(function (error) {
            console.log(error);
        });
    };
}

module.exports = Client;