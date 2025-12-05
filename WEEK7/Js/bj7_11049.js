const fs = require('fs');
const input = fs.readFileSync('/dev/stdin').toString().trim().split('\n');

const n = Number(input[0]);
const matrix = [];
for (let i = 1; i <= n; i++) {
    matrix.push(input[i].split(' ').map(Number));
}

const dp = Array.from({ length: n }, () => new Int32Array(n).fill(0));

for (let gap = 1; gap < n; gap++) {
    for (let i = 0; i + gap < n; i++) {
        const j = i + gap;
        dp[i][j] = Infinity;
        for (let k = i; k < j; k++) {
            const cost = dp[i][k] + dp[k + 1][j] + matrix[i][0] * matrix[k][1] * matrix[j][1];
            dp[i][j] = Math.min(dp[i][j], cost);
        }
    }
}

console.log(dp[0][n - 1]);