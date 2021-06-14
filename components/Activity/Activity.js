import { database, deleteTask, doneTask } from '../../src/api.js';
import { parseHTMLElement, parseHTMLElements } from '../../src/utils.js';

export default ({ parent, user }) => {
    let isMounted = true;

    const child = parseHTMLElement(`
        <div>
        <h3>This is activity page!</h3>
        <ul></ul>
        </div>
        `);


    parent.append(child);

    database.ref(`/users/${user.uid}`).once('value', snapshot => {
        if (!isMounted) return;
        if (snapshot.exists()) {
            const ulElement = child.querySelector('ul');
            const tasks = parseHTMLElements(
                ...Object.entries(snapshot.val()).map(([key, { task, done }]) => {
                    return `
                    <li data-key=${key} ${done ? 'class="marked"' : ''}>
                    <span>${task}</span>
                    <button>Done</button>
                    <button>Remove</button>
                    </li>`
                })
            );
            ulElement.append(...tasks);
        }
    })

    child.querySelector('ul').addEventListener('click', (e) => {
        if(e.target.tagName === 'BUTTON') {
            const element = e.target.parentNode;
            const elementId = element.getAttribute('data-key');
            if(e.target.innerText === 'Done') {
                doneTask(elementId)
                    .then(() => element.className = 'marked');
            } else if(e.target.innerText === 'Remove'){
                deleteTask(elementId)
                    .then(() => element.parentNode.removeChild(element));
            }
        }
            
    })

    return () => {
        isMounted = false;
        parent.removeChild(child);
    }
}