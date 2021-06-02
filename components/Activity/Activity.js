import { parseHTMLElement } from '../../src/utils.js';

export default ({parent}) => {
    const child = parent.appendChild(parseHTMLElement('<h3>This is activity page!</h3>'));
    return () => parent.removeChild(child)
}