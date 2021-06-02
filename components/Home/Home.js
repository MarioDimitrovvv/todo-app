import { parseHTMLElement } from '../../src/utils.js';

export default ({parent}) => {
    const child = parent.appendChild(parseHTMLElement('<h1>This is home page!</h1>'));
    return () => parent.removeChild(child)
}