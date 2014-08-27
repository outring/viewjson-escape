var _escape = require("lodash.escape");
var _defaults = require("lodash.defaults");

var defaultEscapeOptions = {
    always: true
};

function Escape(value, escape) {
    this.value = value;
    this.escape = escape;
}

module.exports = {

    escape: function (value) {
        return new Escape(value, true);
    },

    unescape: function (value) {
        return new Escape(value, false);
    },

    transform: function (escapeOptions) {
        escapeOptions = _defaults({}, escapeOptions, defaultEscapeOptions);

        return function (current, scope, options) {
            var needsEscape = escapeOptions.always;

            if (current instanceof Escape) {
                needsEscape = current.escape || needsEscape;
                current = current.value;
            }

            if (scope.type === "primitive") {
                return needsEscape ? _escape(current) : current;
            }

            return current;
        };
    }

};