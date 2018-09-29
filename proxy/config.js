"use strict";

const argv = require('yargs').argv;

const options = {
    host: process.env.HOST || 'http://localhost',
    port: process.env.PORT || '8080',
    basePath: '/autopay.dc/api/v1/alexa'
};

class Config{
    get baseUrl(){
        return this.stringifyUrl();
    }

    stringifyUrl(){
        let url = options.host + ':' + options.port + options.basePath;
        console.log('Proxy URL: %s', url);

        return url;
    }
}

module.exports = Config;