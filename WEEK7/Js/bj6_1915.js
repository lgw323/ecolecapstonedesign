const fs = require('fs');
const input = fs.readFileSync('/dev/stdin').toString().trim().split('\n');

const [n, m] = input[0].split(' ').map(Number);
const dp = Array.from({ length: n + 1 }, () => new Int32Array(m + 1));
let maxLen = 0;

for (let i = 1; i <= n; i++) {
    const line = input[i];
    for (let j = 1; j <= m; j++) {
        if (line[j - 1] === '1') {
            dp[i][j] = Math.min(dp[i - 1][j], dp[i][j - 1], dp[i - 1][j - 1]) + 1;
            maxLen = Math.max(maxLen, dp[i][j]);
        }
    }
}

console.log(maxLen * maxLen);