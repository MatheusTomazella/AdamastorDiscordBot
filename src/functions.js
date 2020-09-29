module.exports = {
    choose: ( array ) => {
        return array[ Math.floor( Math.random() * array.length ) ];
    }
}