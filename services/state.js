/**
 * Created by choiseonho on 2017. 7. 14..
 */
'use strict';
const MySQL = require('promise-mysql');
const MySQLConfig = require('../config/mysql');
let connection;

exports.userState = async () => {
  const extractTodayState = await getTodayState(day);
  return `요청한 결과\n${extractTodayState}`
};

const getTodayState = () => {
  return new Promise(resolve => {
    MySQL.createConnection(MySQLConfig)
      .then(function (conn) {
        connection = conn;
        return connection.query('select S.sensorName, SV.sensingValue, SV.inputTime ' +
          'from sensing SV,sensor S ' +
          'where SV.sensorId = S.sensorId AND ' +
          'SV.sensorId IN (1,2) AND ' +
          'inputTime IN (select max(inputTime) from sensing GROUP BY sensorId);');
      }).then((result) => {
      let string = '사용자 : 최선호';
      for (let i of result) {
        string = string + i.sensorName + ' : ' + i.sensingValue + '\n';
      }
      resolve(string);
    });
  });
};