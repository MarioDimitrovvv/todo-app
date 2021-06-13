import { parseHTMLElements } from '../../src/utils.js';
import {addTask} from '../../src/api.js'

export default ({parent, user}) => {
    const children = parseHTMLElements(`
        <div>
            <h1>This is home page!</h1>
            ${user ? `<p>Welcome, ${user.email}!` : ''}
        </div>`,
        `<form>
            <label for="activity">Activity:</form>
            <input type="text" name="activity" />
            <input type="submit" value="Add activity" />
        </form>`);

    parent.append(...children);

    children[1].addEventListener('submit', async e => {
        e.preventDefault();
        const task = e.target.querySelectorAll('input')[0].value;
        await addTask(task);
        e.target.querySelectorAll('input')[0].value = '';
    })
    
    return () => children.forEach(x => parent.removeChild(x));
}