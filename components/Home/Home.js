import { parseHTMLElement } from '../../src/utils.js';
import {addTask} from '../../src/api/tasksService.js'

export default ({parent, user}) => {
    const child = parseHTMLElement(`
        <div class="main-part">
            <h1>This is home page!</h1>
            ${user ? `<p class="greeting">Welcome, ${user.email}!` : ''}
            ${user ? 
                `<form class="todo-form">
                    <label for="activity">Activity:</label>
                    <input type="text" name="activity" />
                    <button type="submit"<i class="fas fa-plus"></i></button>
                </form>` 
                : '<h2>You are not logged in!</h2>'}
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