import Header from '../components/Header/Header.js';

(() => {
	
	const main = document.getElementById('main');
	const container = document.createElement('div');
	container.className= 'container';
	const head = document.createElement('header')
	
	const loadApp = () => {
		console.log(!!main.firstChild);
		main.firstChild ? main.removeChild(main.firstChild) : null;
		container.appendChild(head);
		
		Header({parent: head});
		
		main.appendChild(container);
	}

	loadApp();
})();