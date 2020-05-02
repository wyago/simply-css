export type Selector = { [property: string]: string | number | Selector };
export type Styles = { [selector: string]: Selector };

/**
 * Creates a style element containing the given css properties. Each property of the record
 * is treated as a selector with its given properties. If a property has a "&" in the name,
 * the ampersand is replaced with the parent selector, and a separate property map is
 * created for that generated selector.
 * @param css The set of style property maps to use.
 * @param destination A callback for the created css text. Mostly intended for tests.
 */
export function css<T extends Styles>(
        css: T,
        destination: (contents: string) => void = createStyleElement): { [K in keyof T]: K } {
    let text = "";
    const selectorMap: { [selector: string]: string } = {};
    for (const selector of Object.getOwnPropertyNames(css)) {
        selectorMap[selector] = selector;
        text = appendProperties(text, selector, css[selector]);
    }

    destination(text);
    return selectorMap as any;
}

function createStyleElement(contents: string) {
    const element = document.createElement("style");
    element.setAttribute("data-source", "simply-css");
    element.innerHTML = contents;
    document.head.appendChild(element);
}

function appendProperties(text: string, name: string, selector: Selector) {
    text += name + " {\n";
    const all = Object.getOwnPropertyNames(selector);
    const simple = all.filter(property => !property.includes("&"));
    const nested = all.filter(property => property.includes("&"));
    for (const property of simple) {
        const value = selector[property];
        if (typeof value === "string" || typeof value === "number") {
            text += "    " + property + ": " + value + ";\n"
        } else {
            text = appendProperties(text, property, value);
        }
    }
    text += "}\n";

    for (const property of nested) {
        const right = selector[property] ;
        if (typeof right === "string" || typeof right === "number") {
            throw new Error("& nested selector expected an object value");
        }
        text = appendProperties(text, property.replace(/&/g, name), right);
    }
    return text;
}