import events from './events.js';
import { auth } from './api.js';

import Header from '../components/Header/Header.js';
import Home from '../components/Home/Home.js';
import Activity from '../components/Activity/Activity.js';
import Login from '../components/Login/Login.js';
import Register from '../components/Register/Register.js';
import Footer from '../components/Footer/Footer.js';

(() => {

	let isLoading = true;
	let user;

	const routes = {
		home: 'home',
		activity: 'activity',
		login: 'login',
		register: 'register',
	}

	const nonAuthRoutes = [routes.login, routes.register];
	const authRoutes = [routes.activity];

	let route;

	const routeCheck = () => {
		route = window.location.hash.split(/[#\/]/g).filter(x => !!x);
		console.log(route);
		if (
			route[0] === undefined ||
			routes[route[0]] === undefined ||
			(!isLoading && user && nonAuthRoutes.includes(route[0])) ||
			(!isLoading && !user && authRoutes.includes(route[0]))
		) {
			route = [routes.home];
			window.location.hash = `#/${route}`;
		}
		events.emit('routeCheck', { route, user });
	}

	routeCheck();

	window.addEventListener('hashchange', routeCheck);

	const main = document.getElementById('main');
	const container = document.createElement('div');
	container.className = 'container';
	const head = document.createElement('header')

	const components = {
		[routes.home]: Home,
		[routes.activity]: Activity,
		[routes.login]: Login,
		[routes.register]: Register,
	}

	let willUnmount;
	const changeComponent = () => {
		if (willUnmount) {
			willUnmount();
		}
		willUnmount = components[route[0]]({ parent: container, user });
	}

	const loadApp = () => {
		main.firstChild ? main.removeChild(main.firstChild) : null;
		container.appendChild(head);
		main.appendChild(container);

		Header({ parent: head, user });
		changeComponent();
		Footer({ parent: main });

		events.subscribe('routeCheck', changeComponent);
		events.subscribe('authChange', routeCheck);
	}


	auth.onAuthStateChanged((currentUser) => {
		user = currentUser;

		if (isLoading) {
			isLoading = false;
			loadApp();
		}

		events.emit('authChange', { user })
	})

})();