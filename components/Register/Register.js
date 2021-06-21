import {parseHTMLElements} from '../../src/utils.js';
import {register} from '../../src/api/authService.js';

export default ({parent}) => {
    const children = parseHTMLElements(
        '<h1>Register Page</h1>',
        `<form class="main-part register">
            <input type="text" class="auth-input" name="userName" placeholder="Email"/>
            <input type="password" class="auth-input" name="password" placeholder="Password" />
            <input type="password" class="auth-input" name="passwordRepeat" placeholder="Repeated Password" />
            <input type="submit" value="Register" />
        </form>`
    )

    parent.append(...children);

    children[1].addEventListener('submit', e => {
        e.preventDefault();

        const [username, password, repeatPassword] = [...e.target.querySelectorAll('input')].map(el => el.value.trim());
        register(username, password, repeatPassword);
    })

    return () => children.forEach(child => parent.removeChild(child));
} 