const fs = require('fs');
const n = Number(fs.readFileSync('/dev/stdin').toString().trim());

const dp = Array(n + 1).fill(0n);

dp[1] = 1n;
if (n >= 2) dp[2] = 1n;

for (let i = 3; i <= n; i++) {
    dp[i] = dp[i - 1] + dp[i - 2];
}

console.log(dp[n].toString());