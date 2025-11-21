const fs = require('fs');
const [N, M, K_Input] = fs.readFileSync('/dev/stdin').toString().trim().split(' ').map(Number);

let n = N;
let m = M;
let k = BigInt(K_Input);

const dp = Array.from({ length: 201 }, () => new BigInt64Array(201));
const MAX = 1000000000n;

for (let i = 0; i <= 200; i++) {
    dp[i][0] = 1n;
    for (let j = 1; j <= i; j++) {
        dp[i][j] = dp[i - 1][j - 1] + dp[i - 1][j];
        if (dp[i][j] > MAX) dp[i][j] = MAX + 1n;
    }
}

if (dp[n + m][m] < k) {
    console.log("-1");
    process.exit(0);
}

let result = "";
while (n > 0 || m > 0) {
    let aCount = (n > 0) ? dp[n + m - 1][m] : 0n;

    if (n > 0 && k <= aCount) {
        result += "a";
        n--;
    } else {
        result += "z";
        k -= aCount;
        m--;
    }
}

console.log(result);