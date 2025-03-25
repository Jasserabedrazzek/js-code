class CreateElement {
    constructor(options = {}) {
        this.options = options;
    }

    create_html_element() {
        try {
            if (!this.options.tag) throw new Error("Tag name is required");

            const element = document.createElement(this.options.tag);

            if (this.options.attributes) {
                for (let key in this.options.attributes) {
                    element.setAttribute(key, this.options.attributes[key]);
                }
            }

            if (this.options.children) {
                if (Array.isArray(this.options.children)) {
                    this.options.children.forEach(child => {
                        if (child instanceof HTMLElement) {
                            element.appendChild(child);
                        } else {
                            element.appendChild(document.createTextNode(child));
                        }
                    });
                } else if (this.options.children instanceof HTMLElement) {
                    element.appendChild(this.options.children);
                } else {
                    element.textContent = this.options.children;
                }
            }

            return element;
        } catch (error) {
            console.error(error);
            return null;
        }
    }
}

class Css {
    constructor(options = {}) {
        this.options = options;
    }

    create_css() {
        try {
            if (!this.options.selector) throw new Error("Selector is required");
            if (!this.options.css) throw new Error("CSS properties are required");

            let styles = `${this.options.selector} { `;
            for (let key in this.options.css) {
                styles += `${key.replace(/[A-Z]/g, m => '-' + m.toLowerCase())}: ${this.options.css[key]}; `;
            }
            styles += `}`;

            let styleTag = document.querySelector("style#generated-styles");
            if (!styleTag) {
                styleTag = document.createElement("style");
                styleTag.id = "generated-styles";
                document.head.appendChild(styleTag);
            }

            styleTag.textContent += styles;
        } catch (error) {
            console.error(error);
        }
    }
}

class AddElementInDOM {
    constructor(options = {}) {
        this.options = options;
    }

    add_to_DOM() {
        try {
            if (!this.options.element) throw new Error("Element is required");
            if (!this.options.parent) throw new Error("Parent is required");

            const appendElement = () => {
                const parentElement = document.querySelector(this.options.parent);
                if (parentElement) {
                    parentElement.appendChild(this.options.element);
                } else {
                    console.warn(`Parent "${this.options.parent}" not found, retrying...`);
                    setTimeout(appendElement, 100);
                }
            };

            appendElement();
        } catch (error) {
            console.error(error);
        }
    }
}

// Export functions
export function create_html_element(options) {
    return new CreateElement(options).create_html_element();
}

export function create_css(options) {
    return new Css(options).create_css();
}

export function add_to_DOM(options) {
    return new AddElementInDOM(options).add_to_DOM();
}
