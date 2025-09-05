const fs = require('fs');
const input = fs.readFileSync('/dev/stdin').toString().trim().split('\n');

const [n, m] = input[0].split(' ').map(Number);
const numbers = input[1].split(' ').map(Number);

const prefixSum = new Array(n + 1).fill(0);
for (let i = 0; i < n; i++) {
    prefixSum[i + 1] = prefixSum[i] + numbers[i];
}

let result = '';
for (let k = 2; k < m + 2; k++) {
    const [i, j] = input[k].split(' ').map(Number);
    result += (prefixSum[j] - prefixSum[i - 1]) + '\n';
}
console.log(result.trim());