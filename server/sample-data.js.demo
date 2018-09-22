'use strict';

const payload = require('../sample-data/response-payload');

module.exports.data = (event, context, callback) => {
  const body = JSON.stringify(payload);
  const response = {
    statusCode: 200,
    headers: {
      'Content-Type': 'application/json',
    },
    body
  };

  callback(null, response);
};
