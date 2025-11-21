const fs = require('fs');
const [N, K] = fs.readFileSync('/dev/stdin').toString().trim().split(' ').map(Number);

const dp = Array.from({ length: N + 1 }, () => new Int32Array(N + 1));

for (let i = 0; i <= N; i++) {
    for (let j = 0; j <= i; j++) {
        if (j === 0 || j === i) {
            dp[i][j] = 1;
        } else {
            dp[i][j] = (dp[i - 1][j - 1] + dp[i - 1][j]) % 10007;
        }
    }
}

console.log(dp[N][K]);