/**
 * Created by choiseonho on 2017. 7. 14..
 */
'use strict';

const express = require('express');
const router = express.Router();

const state = require('../services/state');

const checkUserKey = (req, res, next) => {
  if (req.body.user_key !== undefined) {
    next();
  } else {
    res.status(500).send({error: 'user_key is undefined'});
  }
};

router.get('/keyboard', (req, res) => {
  const buttons = {
    "type" : "buttons",
    "buttons" : ["상태보기"]
  };
  res.set({
    'content-type': 'application/json'
  }).send(JSON.stringify(buttons))
});

router.post('/message', checkUserKey, async (req, res) => {
  const _obj = {
    user_key: req.body.user_key,
    type: req.body.type,
    content: req.body.content
  };

  let result = '';
  switch (_obj.content) {
    case '상태보기':
      result = await state.userState();
      break;
    default:
      console.log('잘못된 입력입니다.');
      break;
  }

  let message = {
    'message': {
      'text': result
    },
    'keyboard': {
      'type': 'buttons',
      'buttons': [
        '상태보기'
      ]
    }
  };

  res.set({
    'content-type': 'application/json'
  }).send(JSON.stringify(message));
});

module.exports = router;