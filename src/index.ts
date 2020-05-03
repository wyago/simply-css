export type ClassDefinition = { [property: string]: string | number | ClassDefinition };
export type Styles = { [selector: string]: ClassDefinition };

/**
 * Creates a style element containing the given css classes. Each property of the record
 * is treated as a class name with its given properties. If a property has a "&" in the name,
 * the ampersand is replaced with the parent selector, and a separate property map is
 * created for that generated selector. If a property starts with "@" or ends with "%" then
 * it isn't treated as a class.
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

function appendProperties(text: string, name: string, className: ClassDefinition) {
    if (name.startsWith("@") || name.endsWith("%")) {
        text += name + " {\n";
    } else {
        text += "." + name + " {\n";
    }

    const all = Object.getOwnPropertyNames(className);
    const simple = all.filter(property => !property.includes("&"));
    const nested = all.filter(property => property.includes("&"));
    for (const property of simple) {
        const value = className[property];
        if (typeof value === "string" || typeof value === "number") {
            text += "    " + property + ": " + value + ";\n"
        } else {
            text = appendProperties(text, property, value);
        }
    }
    text += "}\n";

    for (const property of nested) {
        const right = className[property] ;
        if (typeof right === "string" || typeof right === "number") {
            throw new Error("& nested selector expected an object value");
        }
        text = appendProperties(text, property.replace(/&/g, name), right);
    }
    return text;
}