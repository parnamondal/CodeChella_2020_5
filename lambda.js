'use strict';
const awsServerlessExpress = require('aws-serverless-express');
const app = require('./server/server');

// NOTE: If you get ERR_CONTENT_DECODING_FAILED in your browser, this is likely
// due to a compressed response (e.g. gzip) which has not been handled correctly
// by aws-serverless-express and/or API Gateway. Add the necessary MIME types to
// binaryMimeTypes below, then redeploy (`npm run package-deploy`)
const binaryMimeTypes = [
  'application/javascript',
  'application/json',
  'application/octet-stream',
  'application/pdf',
  'application/xml',
  'font/eot',
  'font/opentype',
  'font/otf',
  'image/jpeg',
  'image/png',
  'image/x-icon',
  'image/gif',
  'image/svg+xml',
  'text/comma-separated-values',
  'text/css',
  'text/html',
  'text/javascript',
  'text/plain',
  'text/text',
  'text/xml'
];
const server = awsServerlessExpress.createServer(app, null, binaryMimeTypes);
exports.handler = (event, context) => {
  console.log('Request event', event);
  try {
    awsServerlessExpress.proxy(server, event, context);
  }
  catch (err) {
    console.log('Error in lambda', err);
  }
};
