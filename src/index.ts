export type Selector = { [property: string]: string | Selector };
export type Styles = { [selector: string]: Selector };

/**
 * Creates a style element containing the given css properties. Each property of the record
 * is treated as a selector with its given properties. If a property has a "&" in the name,
 * the ampersand is replaced with the parent selector, and a separate property map is
 * created for that generated selector.
 * @param css The set of style property maps to use.
 * @param destination A callback for the created css text. Mostly intended for tests.
 */
export function css(css: Styles, destination: (contents: string) => void = createStyleElement): { [selector: string]: string } {
    let text = "";
    const selectorMap: { [selector: string]: string } = {};
    for (const selector of Object.getOwnPropertyNames(css)) {
        selectorMap[selector] = selector;
        text = createSelector(text, selector, css[selector]);
    }

    destination(text);
    return selectorMap;
}

function createStyleElement(contents: string) {
    const element = document.createElement("style");
    element.setAttribute("data-source", "simply-css");
    element.innerHTML = contents;
    document.head.appendChild(element);
}

function createSelector(text: string, name: string, selector: Selector) {
    text += name + " {\n";
    const all = Object.getOwnPropertyNames(selector);
    const simple = all.filter(property => !property.includes("&"));
    const nested = all.filter(property => property.includes("&"));
    for (const property of simple) {
        text += "    " + property + ": " + selector[property] + ";\n"
    }
    text += "}\n";

    for (const property of nested) {
        const right = selector[property] ;
        if (typeof right === "string") {
            throw new Error("& nested selector expected an object value");
        }
        text = createSelector(text, property.replace(/&/g, name), right);
    }
    return text;
}