import Header from '../components/Header/Header.js';
import Home from '../components/Home/Home.js';
import Activity from '../components/Activity/Activity.js';
import Footer from '../components/Footer/Footer.js';

(() => {

	const routes = {
		home: '',
		activity: 'activity',
	}

	let route;

	const routeCheck = () => {
		route = window.location.hash.split(/[#\/]/g).filter(x => !!x);
		if (
			route[0] === undefined ||
			routes[route[0]] === undefined
		) {
			route = routes.home;
			window.location.hash = `#/${route}`;
		}
	}

	routeCheck();

	window.addEventListener('hashchange', routeCheck);
	
	const main = document.getElementById('main');
	const container = document.createElement('div');
	container.className = 'container';
	const head = document.createElement('header')

	const loadApp = () => {
		main.firstChild ? main.removeChild(main.firstChild) : null;
		container.appendChild(head);
		main.appendChild(container);

		Header({ parent: head });

		Footer({ parent: main })

	}

	loadApp();
})();