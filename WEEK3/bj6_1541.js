const fs = require('fs');
const input = fs.readFileSync('/dev/stdin').toString().trim();

const parts = input.split('-');
let result = 0;

const firstPartSum = parts[0].split('+').map(Number).reduce((a, b) => a + b, 0);
result += firstPartSum;

for (let i = 1; i < parts.length; i++) {
    const otherPartSum = parts[i].split('+').map(Number).reduce((a, b) => a + b, 0);
    result -= otherPartSum;
}

console.log(result);
