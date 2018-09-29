"use strict";

const argv = require('yargs').argv;

const options = {
    host: process.env.HOST || 'http://www.amock.io',
    port: process.env.PORT || '8080',
    basePath: '/api/garrieo'
};

class Config{
    get baseUrl(){
        return this.stringifyUrl();
    }

    stringifyUrl(){
        let url = options.host + options.basePath;
        console.log('Proxy URL: %s', url);

        return url;
    }
}

module.exports = Config;