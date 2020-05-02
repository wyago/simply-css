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
})