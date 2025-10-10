const fs = require('fs');
const input = fs.readFileSync('/dev/stdin').toString().trim().split('\n');

let [n, k] = input[0].split(' ').map(Number);
const coins = [];
for (let i = 1; i <= n; i++) {
    coins.push(Number(input[i]));
}

let count = 0;
for (let i = n - 1; i >= 0; i--) {
    if (coins[i] <= k) {
        count += Math.floor(k / coins[i]);
        k %= coins[i];
    }
    if (k === 0) break;
}

console.log(count);
