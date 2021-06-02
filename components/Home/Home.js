import { parseHTMLElement } from '../../src/utils.js';

export default ({parent}) => parent.appendChild(parseHTMLElement('<h1>This is home page!</h1>'));