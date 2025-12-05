const fs = require('fs');
const input = fs.readFileSync('/dev/stdin').toString().trim().split('\n');

const n = Number(input[0]);
const t = [];
const p = [];

for (let i = 1; i <= n; i++) {
    const [time, pay] = input[i].split(' ').map(Number);
    t.push(time);
    p.push(pay);
}

const dp = new Int32Array(n + 1);

for (let i = n - 1; i >= 0; i--) {
    if (i + t[i] > n) {
        dp[i] = dp[i + 1];
    } else {
        dp[i] = Math.max(dp[i + 1], p[i] + dp[i + t[i]]);
    }
}

console.log(dp[0]);