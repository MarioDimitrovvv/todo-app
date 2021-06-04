import events from './events.js';

import Header from '../components/Header/Header.js';
import Home from '../components/Home/Home.js';
import Activity from '../components/Activity/Activity.js';
import Login from '../components/Login/Login.js';
import Register from '../components/Register/Register.js';
import Footer from '../components/Footer/Footer.js';

(() => {

	const routes = {
		home: 'home',
		activity: 'activity',
		login: 'login',
		register: 'register',
	}

	let route;

	const routeCheck = () => {
		route = window.location.hash.split(/[#\/]/g).filter(x => !!x);
		if (
			route[0] === undefined ||
			routes[route[0]] === undefined
		) {
			route = [routes.home];
			window.location.hash = `#/${route}`;
		}
		events.emit('routeCheck', route);
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
		if(willUnmount) {
			willUnmount();
		}
		willUnmount = components[route[0]]({ parent: container })
	}

	const loadApp = () => {
		main.firstChild ? main.removeChild(main.firstChild) : null;
		container.appendChild(head);
		main.appendChild(container);

		Header({ parent: head });
		changeComponent();
		Footer({ parent: main });

		events.subscribe('routeCheck', changeComponent);
	}

	loadApp();
})();