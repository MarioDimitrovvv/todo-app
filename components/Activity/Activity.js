import { database } from '../../src/api.js';
import { parseHTMLElements } from '../../src/utils.js';

export default ({ parent, user }) => {
    let isMounted = true;
    const children = parseHTMLElements(`
        <h3>This is activity page!</h3>
    `);

    parent.append(...children);

    database.ref(`/users/${user.uid}`).once('value', snapshot => {
        if (!isMounted) return;
        if (snapshot.exists()) {
            const tasks = parseHTMLElements(
                ...Object.values(snapshot.val()).map(x => {
                    // make it more complicated
                    return `<div>${x}</div>`;
                })
            );
            console.log( ...tasks);
            children[children.length - 1].append(...tasks);
        }
    })

    return () => {
        isMounted = false;
        children.forEach(child => parent.removeChild(child));
    }
}