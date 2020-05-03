# simply-css

An alternative css-in-js solution that does as little as possible.
It creates a class for each property passed in,
without extra processing on properties that start with "@" or end in "%".

```js
import { css } from "simply-css";

const selectors = css({
    important: {
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
        '100%': {
            'transform': 'translate(0px, 0px)'
        }
    }
});
```

This snippet adds the style element:
```html
<style data-source="simply-css">
.important {
    animation: important-entry 0.1s;
    font-weight: bold;
}
.important:hover {
    border: 1px solid black;
}
@keyframes important-entry {
    0% {
        transform: translate(0px, -10px);
    }
    100% {
        transform: translate(0px, 0px);
    }
}
</style>
```