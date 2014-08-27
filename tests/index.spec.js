var viewJson = require("viewjson");
var escapeViewJson = require("../src");

function getOptions(escapeOptions) {
    return { transforms: [escapeViewJson.transform(escapeOptions || {})] };
}

describe("ViewJson escape-plugin", function () {

    it("must escape primitives by default", function () {
        expect(viewJson.render("\"test&", getOptions()))
            .toEqual("&quot;test&amp;");
    });

    it("must escape object content by default", function () {
        expect(viewJson.render({ content: "\"test&" }, getOptions()))
            .toEqual("<div>&quot;test&amp;</div>");
    });

    it("must not escape primitives if locally disabled", function () {
        expect(viewJson.render(escapeViewJson.unescape("\"test&"), getOptions({ always: false })))
            .toEqual("\"test&");
    });

    it("must not escape object content if locally disabled", function () {
        expect(viewJson.render({ content: escapeViewJson.unescape("\"test&") }, getOptions({ always: false })))
            .toEqual("<div>\"test&</div>");
    });

    it("must not escape primitives if globally disabled", function () {
        expect(viewJson.render("\"test&", getOptions({ always: false })))
            .toEqual("\"test&");
    });

    it("must not escape object content if globally disabled", function () {
        expect(viewJson.render({ content: "\"test&" }, getOptions({ always: false })))
            .toEqual("<div>\"test&</div>");
    });

    it("must escape primitives if locally enabled", function () {
        expect(viewJson.render(escapeViewJson.escape("\"test&"), getOptions({ always: false })))
            .toEqual("&quot;test&amp;");
    });

    it("must escape object content if locally enabled", function () {
        expect(viewJson.render({ content: escapeViewJson.escape("\"test&") }, getOptions({ always: false })))
            .toEqual("<div>&quot;test&amp;</div>");
    });

});