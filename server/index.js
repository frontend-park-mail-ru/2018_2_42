'use strict';

const express = require('express');
const body = require('body-parser');
const cookie = require('cookie-parser');
const morgan = require('morgan');
const path = require('path');
const app = express();
const proxy = require('express-http-proxy');

app.use(morgan('dev'));
app.use(express.static(path.resolve(__dirname, '..', 'public')));
app.use(body.json());
app.use(cookie());
 

app.use("*", proxy("http://18.222.251.221:8080/", {
  proxyReqPathResolver: function(req) {
    return req.originalUrl;
  }
}))

app.listen(process.env.PORT || 3000, () => {
	console.log(`http://localhost:3000`);
});