import { database, deleteTask, doneTask } from '../../src/api/tasksService.js';
import { parseHTMLElement, parseHTMLElements } from '../../src/utils.js';

export default ({ parent, user }) => {
    let isMounted = true;

    const child = parseHTMLElement(`
        <div class="main-part">
            <h1>This is activity page!</h1>
            <ul class="list"></ul>
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
                    <li data-key=${key} class="item">
                        <div class="${done ? 'marked' : ''}">${task}</div>
                        ${done ? '<i class="fas fa-undo-alt" data-value="Undo"></i>' : '<i class="fas fa-check-square" data-value="Done"></i>'}
                        <i class="fas fa-trash-alt" data-value="Remove"></i>
                    </li>`
                })
                );
                ulElement.append(...tasks);
                
        }
    })

    child.querySelector('ul').addEventListener('click', (e) => {
        console.log(e.target.tagName);
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
                            iElement = '<i class="fas fa-undo-alt" data-value="Undo"></i>';
                        });
                    break;

                case 'Remove':
                    deleteTask(parentElementId)
                        .then(() => parentElement.parentNode.removeChild(parentElement));
                    break;

                case 'Undo':
                    doneTask(parentElementId)
                        .then(() => {
                            divElement.classList.remove('marked');
                            iElement.innerHTML = '<i class="fas fa-check-square" data-value="Done"></i>';
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