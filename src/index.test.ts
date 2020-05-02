import { css } from "./index";
import { expect } from "chai";

describe("simply-css", function() {
    it("creates a basic css property set", () => {
        css({
            'div.hello': {
                'background-color': '#f00',
            }
        }, text => {
            expect(text).equals(`div.hello {
    background-color: #f00;
}
`);
        })
    });
    
    it("creates a basic css number property", () => {
        css({
            'div.hello': {
                'opacity': 0,
            }
        }, text => {
            expect(text).equals(`div.hello {
    opacity: 0;
}
`);
        })
    });

    it("creates multiple css property sets", () => {
        css({
            'div.hello': {
                'background-color': '#f00',
            },
            'span.bye': {
                'color': '#0f0'
            }
        }, text => {
            expect(text).equals(`div.hello {
    background-color: #f00;
}
span.bye {
    color: #0f0;
}
`);
        })
    });
    
    it("creates nested css property sets", () => {
        css({
            'div.hello': {
                'background-color': '#f00',
                '&:hover': {
                    'background-color': '#00f'
                }
            },
        }, text => {
            expect(text).equals(`div.hello {
    background-color: #f00;
}
div.hello:hover {
    background-color: #00f;
}
`);
        })
    });
    
    it("creates the readme example", () => {
        css({
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
        }, text => {
            expect(text).equals(`div.important {
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
`);
        })
    });
})
