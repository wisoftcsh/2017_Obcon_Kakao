/**
 * Created by choiseonho on 2017. 7. 14..
 */
'use strict';
const req = require('request');

exports.userState = async () => {
    const extractTodayState = await getTodayState();
    console.log(extractTodayState);
    return `요청한 결과\n${extractTodayState}`
};

const getTodayState = () => {
    return new Promise(resolve => {
        req(
            { method: 'GET',
              uri: ''
            },
            function (error, response, body) {
                resolve(body);
            }
        );
    });
};