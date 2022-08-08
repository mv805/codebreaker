export function codeGenerator() {
    let code = [];
    for (let index = 0; index < 4; index++) {
        code.push(getRandomInt(0, 10));
    }
    return code;
}

function getRandomInt(min, max) {
    min = Math.ceil(min);
    max = Math.floor(max);
    return Math.floor(Math.random() * (max - min) + min); //The maximum is exclusive and the minimum is inclusive
}