# simply-css

An alternative css-in-js solution that does as little as possible. It supports '&' nested selectors,
and nested objects for animations.
It will not otherwise interfere with your css strings.

```js
import { css } from "simply-css";

const selectors = css({
    'div.important': {
        'animation': 'important-entry 0.1s',
        'font-weight': 'bold',
        '&:hover': {
            'border': '1px solid black'
        }
    },
    '@keyframes important-entry': {
        '0%': {
            'transform': 'translate(0px, -10px)'
        },
        '99%': {
            'transform': 'translate(0px, 0px)'
        },
        '100%': {
        }
    }
});
```

This snippet adds the style element:
```html
<style data-source="simply-css">
div.important {
    animation: important-entry 0.1s;
    font-weight: bold;
}
div.important:hover {
    border: 1px solid black;
}
@keyframes important-entry {
    0% {
        transform: translate(0px, -10px);
    }
    99% {
        transform: translate(0px, 0px);
    }
    100% {
    }
}
</style>
```