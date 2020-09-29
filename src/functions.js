const { resolve } = require("path");

module.exports = {
    choose: ( array ) => {
        return array[ Math.floor( Math.random() * array.length ) ];
    }
}