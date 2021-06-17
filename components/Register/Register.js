import {parseHTMLElements} from '../../src/utils.js';
import {register} from '../../src/api/authService.js';

export default ({parent}) => {
    const children = parseHTMLElements(
        '<h1>Register Form</h1>',
        `<form>
            <div class="form-elements">
                <label for="userName">Username:</label>
                <input type="text" name="userName" />
            </div>
            <div class="form-elements">
                <label for="password">Password:</label>
                <input type="password" name="password" />
            </div>
            <div class="form-elements">
                <label for="passwordRepeat">Repeat Password:</label>
                <input type="password" name="passwordRepeat" />
            </div>
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