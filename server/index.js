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
		login: 'a.ostapenko@corp.mail.ru',
		password: 'password',
	},
	'd.dorofeev@corp.mail.ru': {
		login: 'd.dorofeev@corp.mail.ru',
		password: 'password',
	},
	's.volodin@corp.mail.ru': {
		login: 'marina.titova@corp.mail.ru',
		password: 'password',
	},
	'a.tyuldyukov@corp.mail.ru': {
		login: 'a.tyuldyukov@corp.mail.ru',
		password: 'password',
	},
};

const ids = {};

app.post('/sign_up', function (req, res) {
	const password = req.body.password;
	const login = req.body.login;

	if (users[login]) {
		return res.status(400).json({error: 'Пользователь уже существует'});
	}

	const id = uuid();
	const user = {
		login: login,
		password: password,
	};
	ids[id] = login;
	users[login] = user;

	res.cookie('sessionid', id, {expires: new Date(Date.now() + 1000 * 60 * 10)});
	res.status(201).json({id});
});

app.post('/sign_in', function (req, res) {
	const password = req.body.password;
	const login = req.body.login;

	if (!password || !login) {
		return res.status(400).json({error: 'Не указан логин или пароль'});
	}
	if (!users[login] || users[login].password !== password) {
		return res.status(400).json({error: 'Не верный логин и/или пароль'});
	}

	const id = uuid();
	ids[id] = login;

	res.cookie('sessionid', id, {expires: new Date(Date.now() + 1000 * 60 * 10)});
	res.status(201).json({id});
});

// app.get('/user?id=', function (req, res) {
// 	const id = req.cookies['sessionid'];
// 	const email = ids[id];
// 	if (!email || !users[email]) {
// 		return res.status(401).end();
// 	}

// 	res.json(users[email]);
// });

app.get('/users', function (req, res) {
	const scorelist = Object.values(users)
		.map(user => {
			return {
				login: user.login,
			}
		});

	res.json(scorelist);
});

const port = process.env.PORT || 3000;

app.listen(port, function () {
	console.log(`Server listening port ${port}`);
	console.log(`http://localhost:${port}`);
});
