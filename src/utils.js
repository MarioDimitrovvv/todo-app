export const parseHTMLElement = (htmlString) => 
    new DOMParser().parseFromString(htmlString, 'text/html').documentElement.querySelector('body').firstChild;
    
export const parseHTMLElements = (...htmlStrings) => htmlStrings.map(parseHTMLElement);

export const notify = (msg, type) => {
    const notificationElement = document.createElement('div');
    notificationElement.className = 'notification ' + type;
    notificationElement.innerText = msg;

    document.querySelector('.container').appendChild(notificationElement);
    window.setTimeout(() => {
        document.querySelector('.container').removeChild(notificationElement);
    }, 2000)
}