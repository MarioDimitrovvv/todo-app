import { parseHTMLElement } from '../../src/utils.js';

export default ({parent, user}) => {
    const child = parent.appendChild(parseHTMLElement(`
        <div>
            <h1>This is home page!</h1>
            ${user ? `<p>Welcome, ${user.email}!` : ''}
        </div>
    `));
    return () => parent.removeChild(child)
}