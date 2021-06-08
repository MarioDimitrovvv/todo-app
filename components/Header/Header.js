import { logout } from '../../src/api.js';
import events from '../../src/events.js';
import { parseHTMLElement } from '../../src/utils.js';

export default ({parent, user}) => {
    let unmount;

    const render = (user) => {
        const child = parseHTMLElement(
            `<div>
                <a href="#/home">Home</a>
                <a href="#/activity">My activities</a>
                ${user 
                    ? `<a href="#/logout">Logout</a>`
                    : `<a href="#/login">Login</a>
                       <a href="#/register">Register</a>`
                }
            </div>`
        );

        if(unmount) {
            unmount();
        }

        parent.prepend(child);

        if(user) {
            child.querySelector('a:nth-child(3)').addEventListener('click', (е) => {
                е.preventDefault();
                logout();
            })
        }
        
        unmount = () => parent.removeChild(child);
    }

    render(user);
    
    events.subscribe('authChange', ({user}) => {
        render(user)
    })
}
