import {parseHTMLElements} from '../../src/utils.js'
import {register} from '../../src/api.js'

export default ({parent}) => {
    const children = parseHTMLElements(
        '<h1>Register Form</h1>',
        `<form>
            <div>
                <label for="userName">Username:</label>
                <input type="text" name="userName" />
            </div>
            <div>
                <label for="password">Password:</label>
                <input type="password" name="password" />
            </div>
            <div>
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
        console.log(username, password, repeatPassword);
        register(username, password, repeatPassword);
    })

    return () => children.forEach(child => parent.removeChild(child));
} 