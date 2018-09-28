'use strict';

const express = require('express');
const body = require('body-parser');
const cookie = require('cookie-parser');
const morgan = require('morgan');
const uuid = require('uuid/v4');
const path = require('path');
const app = express();


app.use(morgan('dev'));
app.use(express.static(path.resolve(__dirname, '..', 'public')));
app.use(body.json());
app.use(cookie());


const users = {
	'a.ostapenko@corp.mail.ru': {
		email: 'a.ostapenko@corp.mail.ru',
		password: 'password',
		age: 21,
		score: 72,
	},
	'd.dorofeev@corp.mail.ru': {
		email: 'd.dorofeev@corp.mail.ru',
		password: 'password',
		age: 21,
		score: 100500,
	},
	's.volodin@corp.mail.ru': {
		email: 'marina.titova@corp.mail.ru',
		password: 'password',
		age: 21,
		score: 72,
	},
	'a.tyuldyukov@corp.mail.ru': {
		email: 'a.tyuldyukov@corp.mail.ru',
		password: 'password',
		age: 21,
		score: 72,
	},
};
const ids = {};

app.post('/sign_up', function (req, res) {
	const password = req.body.password;
	const email = req.body.email;
	const lastName = req.body.lastName;
	const firstName = req.body.firstName;

	const id = uuid();
	const user = {password, email, lastName, firstName};
	ids[id] = email;
	users[email] = user;

	res.cookie('sessionid', id, {expires: new Date(Date.now() + 1000 * 60 * 10)});
	res.status(201).json({id});
});

app.post('/sign_in', function (req, res) {
	const password = req.body.password;
	const email = req.body.email;

	const id = uuid();
	ids[id] = email;

	res.cookie('sessionid', id, {expires: new Date(Date.now() + 1000 * 60 * 10)});
	res.status(201).json({id});
});

app.get('/profile', function (req, res) {
	const id = req.cookies['sessionid'];
	const email = ids[id];
	if (!email || !users[email]) {
		return res.status(401).end();
	}

	users[email].score += 1;

	res.json(users[email]);
});

app.get('/users', function (req, res) {
	const scorelist = Object.values(users)
		.sort((l, r) => r.score - l.score)
		.map(user => {
			return {
				email: user.email,
				age: user.age,
				score: user.score,
			}
		});

	res.json(scorelist);
});

const port = process.env.PORT || 3000;

app.listen(port, function () {
	console.log(`Server listening port ${port}`);
	console.log(`http://localhost:${port}`);
});
