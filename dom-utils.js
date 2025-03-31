import { create_html_element, add_to_DOM, create_css } from './create-page.js';

export function createElement(options) { 
    return create_html_element(options); 
}

export function applyStyles(options) { 
    return create_css(options); 
}

export function appendToDOM(options) { 
    return add_to_DOM(options); 
}
