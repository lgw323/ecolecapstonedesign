const fs = require('fs');
const input = fs.readFileSync('/dev/stdin').toString().trim().split('\n');

const T = Number(input[0]);
const dp = Array.from({ length: 30 }, () => new Int32Array(30));

for (let i = 0; i < 30; i++) {
    dp[i][i] = 1;
    dp[i][0] = 1;
}

for (let i = 2; i < 30; i++) {
    for (let j = 1; j < 30; j++) {
        dp[i][j] = dp[i - 1][j - 1] + dp[i - 1][j];
    }
}

const output = [];
for (let i = 1; i <= T; i++) {
    const [N, M] = input[i].split(' ').map(Number);
    output.push(dp[M][N]);
}

console.log(output.join('\n'));