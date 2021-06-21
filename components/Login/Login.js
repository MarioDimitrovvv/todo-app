import { login } from '../../src/api/authService.js';
import { parseHTMLElements } from '../../src/utils.js'

export default ({parent}) => {

    const children = parseHTMLElements(
        '<h1>Login Page</h1>',
        `<form class="main-part login">
            <input type="text" class="auth-input" name="userName" placeholder="Email" />
            <input type="password" class="auth-input" name="password" placeholder="Password" />
            <input type="submit" value="Login" />
        </form>`);

    parent.append(...children);
    
    children[1].addEventListener('submit', (e) => {
        e.preventDefault();
        const [username, password] = [...document.querySelectorAll('input')].map(el => el.value.trim());
        login(username, password);
    })
    
    return () => children.forEach(child => parent.removeChild(child));
}