const fs = require('fs');
const input = fs.readFileSync('/dev/stdin').toString().trim().split('\n');

const n = Number(input[0]);
const w = [];
for (let i = 1; i <= n; i++) {
    w.push(input[i].split(' ').map(Number));
}

const INF = 16000000;
const dp = Array.from({ length: n }, () => new Int32Array(1 << n).fill(-1));

function tsp(current, visited) {
    if (visited === (1 << n) - 1) {
        return w[current][0] === 0 ? INF : w[current][0];
    }

    if (dp[current][visited] !== -1) {
        return dp[current][visited];
    }

    dp[current][visited] = INF;

    for (let i = 0; i < n; i++) {
        if ((visited & (1 << i)) === 0 && w[current][i] !== 0) {
            dp[current][visited] = Math.min(
                dp[current][visited],
                tsp(i, visited | (1 << i)) + w[current][i]
            );
        }
    }
    return dp[current][visited];
}

console.log(tsp(0, 1));