import { css } from "./index";
import { expect } from "chai";

describe("simply-css", function() {
    it("creates a basic css property set", () => {
        css({
            hello: {
                'background-color': '#f00',
            }
        }, text => {
            expect(text).equals(`.hello {
    background-color: #f00;
}
`);
        })
    });
    
    it("creates a basic css number property", () => {
        css({
            hello: {
                'opacity': 0,
            }
        }, text => {
            expect(text).equals(`.hello {
    opacity: 0;
}
`);
        })
    });

    it("creates multiple css property sets", () => {
        css({
            hello: {
                'background-color': '#f00',
            },
            bye: {
                'color': '#0f0'
            }
        }, text => {
            expect(text).equals(`.hello {
    background-color: #f00;
}
.bye {
    color: #0f0;
}
`);
        })
    });
    
    it("creates nested css property sets", () => {
        css({
            hello: {
                'background-color': '#f00',
                '&:hover': {
                    'background-color': '#00f'
                }
            },
        }, text => {
            expect(text).equals(`.hello {
    background-color: #f00;
}
.hello:hover {
    background-color: #00f;
}
`);
        })
    });
    
    it("creates the readme example", () => {
        css({
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
                '99%': {
                    'transform': 'translate(0px, 0px)'
                },
                '100%': {
                }
            }
        }, text => {
            expect(text).equals(`.important {
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
