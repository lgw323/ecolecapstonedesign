const fs = require('fs');
const [s1, s2] = fs.readFileSync('/dev/stdin').toString().trim().split('\n');

const n = s1.length;
const m = s2.length;
const dp = Array.from({ length: n + 1 }, () => new Int32Array(m + 1));

for (let i = 1; i <= n; i++) {
    for (let j = 1; j <= m; j++) {
        if (s1[i - 1] === s2[j - 1]) {
            dp[i][j] = dp[i - 1][j - 1] + 1;
        } else {
            dp[i][j] = Math.max(dp[i - 1][j], dp[i][j - 1]);
        }
    }
}

console.log(dp[n][m]);

const result = [];
let i = n, j = m;
while (i > 0 && j > 0) {
    if (dp[i][j] === dp[i - 1][j]) {
        i--;
    } else if (dp[i][j] === dp[i][j - 1]) {
        j--;
    } else {
        result.push(s1[i - 1]);
        i--;
        j--;
    }
}

console.log(result.reverse().join(''));