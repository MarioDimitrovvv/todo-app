import { parseHTMLElement } from '../../src/utils.js';

export default ({parent}) => {
    let unmount;

    const render = () => {
        const child = parseHTMLElement(
            `<div>
                <a href="#/">Home</a>
                <a href="#/activity">My activities</a>
            </div>`
        );
        
        if(unmount) {
            unmount();
        }
        
        parent.prepend(child);

        unmount = () => parent.remove(child);
        
    }

    render();
}
