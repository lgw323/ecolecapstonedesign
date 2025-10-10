const fs = require('fs');
const input = fs.readFileSync('/dev/stdin').toString().trim().split('\n');

const t = Number(input[0]);

function gcd(a, b) {
    while (b) {
        [a, b] = [b, a % b];
    }
    return a;
}

function lcm(a, b) {
    return (a * b) / gcd(a, b);
}

let result = '';
for (let i = 1; i <= t; i++) {
    const [a, b] = input[i].split(' ').map(Number);
    result += lcm(a, b) + '\n';
}

console.log(result.trim());
