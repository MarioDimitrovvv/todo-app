import { parseHTMLElement } from '../../src/utils.js';

export default ({parent}) => parent.appendChild(parseHTMLElement('<footer>ToDo Application &copy; 2021</footer>'));