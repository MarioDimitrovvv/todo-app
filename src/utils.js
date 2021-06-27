export const parseHTMLElement = (htmlString) => 
    new DOMParser().parseFromString(htmlString, 'text/html').documentElement.querySelector('body').firstChild;
    
export const parseHTMLElements = (...htmlStrings) => htmlStrings.map(parseHTMLElement);

export const notify = (() => {

    const notifications = parseHTMLElement(`<div class="notifications"></div>`)
    document.querySelector('body').prepend(notifications)

    const remove = (child) => {
        if(notifications.contains(child)) {
            notifications.removeChild(child);
        }
    }
    
    return (msg, type) => {
        const notification = parseHTMLElement(`
            <div class="notification ${type}">
                <div class="notif-content">${msg}</div>
                <div class="notif-close ${type}">X</div>
            </div>`)
        
        notifications.appendChild(notification);
        window.setTimeout(() => remove(notification), 3000);
        console.log(notification.lastChild);
        notification.querySelector('div:nth-child(2)').addEventListener('click', () => remove(notification));
    }
})();