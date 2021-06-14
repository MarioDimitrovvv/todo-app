import { database, deleteTask, doneTask } from '../../src/api/tasksService.js';
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
                    <button>${done ? 'Undo' : 'Done'}</button>
                    <button>Remove</button>
                    </li>`
                })
            );
            ulElement.append(...tasks);
        }
    })

    child.querySelector('ul').addEventListener('click', (e) => {
        if (e.target.tagName === 'BUTTON') {
            const buttonElement = e.target;
            const parentElement = e.target.parentNode;
            const parentElementId = parentElement.getAttribute('data-key');

            switch (buttonElement.innerText) {
                case 'Done':
                    doneTask(parentElementId, 'done')
                        .then(() => {
                            parentElement.className = 'marked';
                            buttonElement.innerText = 'Undo';
                        });
                    break;

                case 'Remove':
                    deleteTask(parentElementId)
                        .then(() => parentElement.parentNode.removeChild(parentElement));
                    break;

                case 'Undo':
                    doneTask(parentElementId)
                        .then(() => {
                            parentElement.classList.remove('marked');
                            buttonElement.innerText = 'Done';
                        })
                    break;
            }
        }
    })

    return () => {
        isMounted = false;
        parent.removeChild(child);
    }
}