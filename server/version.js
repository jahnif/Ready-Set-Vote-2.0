'use strict';

const { version } = require('../package');

module.exports.version = (event, context, callback) => {
  const body = JSON.stringify({ version });
  const response = {
    statusCode: 200,
    headers: {
      'Content-Type': 'application/json',
    },
    body
  };

  callback(null, response);
};
