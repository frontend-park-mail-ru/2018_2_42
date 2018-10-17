import bus 				from './bus.js';
import Router 			from './router.js';
import MenuView 		from './views/MenuView.js';
import ProfileView 		from './views/ProfileView.js';
import SignUpView 		from './views/SignUpView.js';
import SignInView 		from './views/SignInView.js';
import AboutView 		from './views/AboutView.js';
import LeaderBoardView 	from './views/LeaderBoardView.js';
import {APIModule} 		from './modules/api.js';

const api = new APIModule;

bus.on('fetch-leaders', function ({page, limit}) {

	api.Leaders(page, limit)
		.then(function (response) {
			console.log(response);
		if (!response.ok) {
			throw new Error('Server response was not ok.');
		}
		return response.json();
		})
		.then(function (users) {
			console.log(users);
			bus.emit('leaders-loaded', users);
		})
		.catch(function (error) {
			console.error(error);
		});
});

bus.on('fetch-profile', function (login) {
	api.Profile(login)
		.then(function (response) {
			if (!response.ok) {
				throw new Error('Server response was not ok.');
			}
			return response.json();
		})
		.then(function (profile) {
			bus.emit('profile-loaded', profile);
		})
		.catch(function (error) {
			console.error(error);
		});
});

bus.on('sign-up-user', function(details){
	api.SignUp(details)
		.then(response => {
			console.log(response);
			if (!response.ok) {
				throw new Error('Server response was not ok.');
			}
			return response.json();
		})
		.then(data => {
			console.log(data);
			bus.emit('successful-sign-up');
		})
		.catch(error => {
			console.log(error);
			bus.emit('unsuccessful-sign-up', error);
		});

});

bus.on('sign-in-user', function(details){
	api.SignIn(details)
		.then(response => {
			console.log(response);
			if (!response.ok) {
				throw new Error('Server response was not ok.');
			}
			return response.json();
		})
		.then(data => {
			bus.emit('successful-sign-in');
		})
		.catch(error => {
			console.log(error);
			bus.emit('unsuccessful-sign-in', error);
		});

});

bus.on('sign-out', function(){
	api.SignOut()
		.then(response => {
			console.log(response);
			if (!response.ok) {
				throw new Error('Server response was not ok.');
			}
			return response.json();
		})
		.then(data => {
			console.log('emitting succ');
			bus.emit('successful-sign-out');
		})
		.catch(error => {
			console.log(error);
			bus.emit('unsuccessful-sign-out', error);
		});
});

const root = document.getElementById('root');
const router = new Router(root);

router
	.register('/', MenuView)
	.register('/profile', ProfileView)
	.register('/sign_up', SignUpView)
	.register('/about', AboutView)
	.register('/users', LeaderBoardView)
	.register('/sign_out', null, ()=> {localStorage.removeItem('login')})
	.register('/sign_in', SignInView);

router.start();
