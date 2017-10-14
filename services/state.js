/**
 * Created by choiseonho on 2017. 7. 14..
 */
'use strict';
const req = require('request');
const https = require('https');
let agentOptions;
let agent;

exports.userState = async () => {
    const extractTodayState = await getTodayState();
    console.log(extractTodayState);
    return `요청한 결과\n${extractTodayState}`
};

const getTodayState = () => {
    return new Promise(resolve => {
        agentOptions = {
            host: 'localhost'
            , port: '11011'
            , path: '/value'
            , rejectUnauthorized: false
        };

        agent = new https.Agent(agentOptions);
        req({
            url: "https://localhost:11011/value"
            , method: 'GET'
            , agent: agent
        }, function (err, resp, body) {
            resolve(body);
        });
    });
};