import { parseHTMLElement } from '../../src/utils.js';

export default ({parent}) => {

    const render = () => {
        const child = parseHTMLElement(
            `<div>
                <a href="#/home">Home</a>
                <a href="#/activity">My activities</a>
                <a href="#/login">Login</a>
                <a href="#/register">Register</a>
            </div>`
        );
        
        parent.prepend(child);

        
        return () => parent.remove(child);
    }

    render();
    

}
