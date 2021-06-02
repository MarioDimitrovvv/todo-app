import { parseHTMLElement } from '../../src/utils.js';

export default ({parent}) => parent.appendChild(parseHTMLElement('<h3>This is activity page!</h3>'));