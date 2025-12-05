const fs = require('fs');
const input = fs.readFileSync('/dev/stdin').toString().trim().split('\n');

const n = Number(input[0]);
const x = [];
const y = [];

for (let i = 1; i <= n; i++) {
    const [a, b] = input[i].split(' ').map(BigInt);
    x.push(a);
    y.push(b);
}

x.push(x[0]);
y.push(y[0]);

let sumA = 0n;
let sumB = 0n;

for (let i = 0; i < n; i++) {
    sumA += x[i] * y[i + 1];
    sumB += y[i] * x[i + 1];
}

let result = sumA - sumB;
if (result < 0n) result = -result;

console.log((Number(result) / 2).toFixed(1));