'use strict';
const express = require('express');
const body = require('body-parser');
const cookie = require('cookie-parser');
const morgan = require('morgan');
const path = require('path');
const app = express();
const proxy = require('express-http-proxy');
const fallback = require('express-history-api-fallback');

const rootDir = path.resolve(__dirname, '..', 'public');

app.use(morgan('dev'));
app.use(express.static(rootDir));
app.use(body.json());
app.use(cookie());

app.use('/api', proxy('http://18.222.251.221:8080', {
  proxyReqPathResolver: (req) => {
    return `/api${req.url}`;
  }
}));

app.use(fallback('index.html', { root: rootDir }));

app.listen(process.env.PORT || 3000, () => {
	console.log(`http://localhost:3000`);
});