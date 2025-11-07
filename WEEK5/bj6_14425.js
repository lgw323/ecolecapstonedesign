const fs = require('fs');
const input = fs.readFileSync('/dev/stdin').toString().trim().split('\n');
let lineIndex = 0;

const [N, M] = input[lineIndex++].split(' ').map(Number);

const setS = new Set();
for (let i = 0; i < N; i++) {
    setS.add(input[lineIndex++]);
}

let count = 0;
for (let i = 0; i < M; i++) {
    if (setS.has(input[lineIndex++])) {
        count++;
    }
}

console.log(count);