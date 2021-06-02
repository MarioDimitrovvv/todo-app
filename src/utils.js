export const parseHTMLElement = (htmlString) => 
    new DOMParser().parseFromString(htmlString, 'text/html').documentElement.querySelector('body').firstChild;
    
export const parseHTMLElements = (...htmlStrings) => htmlStrings.map(parseHTMLElement);