import { logout } from '../../src/api/authService.js';
import events from '../../src/events.js';
import { parseHTMLElement } from '../../src/utils.js';

export default ({ parent, user }) => {
    let unmount;
    const render = (user) => {
        const child = parseHTMLElement(
            `<div class="header">
            <a href="#/home">Home</a>
            ${user
                ? `
                <a href="#/activity">My activities</a>
                <a href="#/logout">Logout</a>
                `
                : `<a href="#/login">Login</a>
                <a href="#/register">Register</a>`
            }
            </div>`
        );
        if (unmount) {
            unmount();

            window.addEventListener('hashchange', () => {
                [...child.children].forEach(el => {
                    if (el.hash === window.location.hash) {
                        el.className = 'clicked'
                    }
                })
            });
        }

        parent.prepend(child);

        if (user) {
            child.querySelector('a:nth-child(3)').addEventListener('click', (е) => {
                е.preventDefault();
                logout();
            })
        }

        unmount = () => parent.removeChild(child);
    }

    render(user);

    events.subscribe('authChange', ({ user }) => {
        render(user);
    })
}
