const fs = require('fs');
const input = fs.readFileSync('/dev/stdin').toString().trim().split('\n');
let lineIndex = 0;

const N = parseInt(input[lineIndex++]);

const visited = new Array(N + 1).fill(false);
const answer = new Array(N + 1).fill(0);
const tree = Array.from({ length: N + 1 }, () => []);

for (let i = 1; i < N; i++) {
    const [n1, n2] = input[lineIndex++].split(' ').map(Number);
    tree[n1].push(n2);
    tree[n2].push(n1);
}

function DFS(number) {
    visited[number] = true;
    for (const child of tree[number]) {
        if (!visited[child]) {
            answer[child] = number;
            DFS(child);
        }
    }
}

DFS(1);

const sb = [];
for (let i = 2; i <= N; i++) {
    sb.push(answer[i]);
}
console.log(sb.join('\n'));