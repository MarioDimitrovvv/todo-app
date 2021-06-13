import { parseHTMLElement } from '../../src/utils.js';
import {addTask} from '../../src/api.js'

export default ({parent, user}) => {
    const child = parseHTMLElement(`
        <div>
            <h1>This is home page!</h1>
            ${user ? `<p>Welcome, ${user.email}!` : ''}
            ${user ? 
                `<form>
                <label for="activity">Activity:</form>
                <input type="text" name="activity" />
                <input type="submit" value="Add activity" />
                </form>` : ''}
        </div>`);

    parent.append(child);

    child.querySelector('form')?.addEventListener('submit', async e => {
        e.preventDefault();
        const task = e.target.querySelectorAll('input')[0].value;
        await addTask(task);
        e.target.querySelectorAll('input')[0].value = '';
    })
    
    return () => parent.removeChild(child);
}