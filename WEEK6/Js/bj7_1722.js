const fs = require('fs');
const input = fs.readFileSync('/dev/stdin').toString().trim().split('\n');

const N = Number(input[0]);
const query = input[1].split(' ').map(BigInt);
const option = query[0];

const fact = new BigInt64Array(21);
fact[0] = 1n;
for (let i = 1; i <= 20; i++) {
    fact[i] = fact[i - 1] * BigInt(i);
}

const visited = new Uint8Array(21);
const output = [];

if (option === 1n) {
    let k = query[1];
    const result = [];

    for (let i = 0; i < N; i++) {
        for (let j = 1; j <= N; j++) {
            if (visited[j]) continue;
            if (k <= fact[N - 1 - i]) {
                result.push(j);
                visited[j] = 1;
                break;
            }
            k -= fact[N - 1 - i];
        }
    }
    console.log(result.join(' '));
} else {
    const arr = query.slice(1).map(Number);
    let result = 1n;

    for (let i = 0; i < N; i++) {
        for (let j = 1; j < arr[i]; j++) {
            if (!visited[j]) {
                result += fact[N - 1 - i];
            }
        }
        visited[arr[i]] = 1;
    }
    console.log(result.toString());
}