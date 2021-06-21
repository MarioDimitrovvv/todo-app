import { database, deleteTask, doneTask } from '../../src/api/tasksService.js';
import { parseHTMLElement, parseHTMLElements } from '../../src/utils.js';

export default ({ parent, user }) => {
    let isMounted = true;

    const child = parseHTMLElement(`
        <div class="main-part">
            <h1>Here are your tasks!</h1>
            <ul class="list"></ul>
        </div>
        `);


    parent.append(child);

    const ulElement = child.querySelector('ul');
    database.ref(`/users/${user.uid}`).once('value', snapshot => {
        if (!isMounted) return;
        if (snapshot.exists()) {
            const tasks = parseHTMLElements(
                ...Object.entries(snapshot.val()).map(([key, { task, done }]) => {
                    return `
                    <li data-key=${key} class="item">
                        <div class="${done ? 'marked' : ''}">${task}</div>
                        ${done ? '<i class="fas fa-undo-alt" data-value="Undo"></i>' : '<i class="fas fa-check-square" data-value="Done"></i>'}
                        <i class="fas fa-trash-alt" data-value="Remove"></i>
                    </li>`
                })
                );
                ulElement.append(...tasks);
                
        } else {
            ulElement.appendChild(parseHTMLElement('<h3>You don\'t have any tasks!</h3>'));
        }
    })

    child.querySelector('ul').addEventListener('click', (e) => {
        if (e.target.tagName === 'I') {
            const iElement = e.target;
            const iElementValue = iElement.getAttribute('data-value');
            const parentElement = e.target.parentNode;
            const divElement = parentElement.querySelector('div');
            const parentElementId = parentElement.getAttribute('data-key');

            switch (iElementValue) {
                case 'Done':
                    doneTask(parentElementId, 'done')
                        .then(() => {
                            divElement.className = 'marked';
                            parentElement.replaceChild(parseHTMLElement('<i class="fas fa-undo-alt" data-value="Undo"></i>'), iElement)
                        });
                    break;

                case 'Remove':
                    deleteTask(parentElementId)
                        .then(() => {
                            parentElement.parentNode.removeChild(parentElement)
                            if(!ulElement.firstElementChild){
                                ulElement.appendChild(parseHTMLElement('<h3>You don\'t have any tasks!</h3>'));
                            }
                        });
                    break;

                case 'Undo':
                    doneTask(parentElementId)
                        .then(() => {
                            divElement.classList.remove('marked');
                            parentElement.replaceChild(parseHTMLElement('<i class="fas fa-check-square" data-value="Done"></i>'), iElement)
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