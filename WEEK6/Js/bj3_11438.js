const fs = require('fs');
const input = fs.readFileSync('/dev/stdin').toString().trim().split('\n');

let lineIdx = 0;
const N = Number(input[lineIdx++]);

let K = 0;
let temp = 1;
while (temp <= N) {
    temp *= 2;
    K++;
}

const adj = Array.from({ length: N + 1 }, () => []);
const parent = Array.from({ length: K + 1 }, () => new Int32Array(N + 1));
const depth = new Int32Array(N + 1);
const visited = new Uint8Array(N + 1);

for (let i = 0; i < N - 1; i++) {
    const [a, b] = input[lineIdx++].split(' ').map(Number);
    adj[a].push(b);
    adj[b].push(a);
}

const stack = [[1, 0]];
visited[1] = 1;

while (stack.length) {
    const [node, d] = stack.pop();
    depth[node] = d;

    for (const next of adj[node]) {
        if (!visited[next]) {
            visited[next] = 1;
            parent[0][next] = node;
            stack.push([next, d + 1]);
        }
    }
}

for (let i = 1; i <= K; i++) {
    for (let j = 1; j <= N; j++) {
        parent[i][j] = parent[i - 1][parent[i - 1][j]];
    }
}

const M = Number(input[lineIdx++]);
const output = [];

function lca(a, b) {
    if (depth[a] < depth[b]) [a, b] = [b, a];

    for (let i = K; i >= 0; i--) {
        if (Math.pow(2, i) <= depth[a] - depth[b]) {
            a = parent[i][a];
        }
    }

    if (a === b) return a;

    for (let i = K; i >= 0; i--) {
        if (parent[i][a] !== parent[i][b]) {
            a = parent[i][a];
            b = parent[i][b];
        }
    }

    return parent[0][a];
}

for (let i = 0; i < M; i++) {
    const [a, b] = input[lineIdx++].split(' ').map(Number);
    output.push(lca(a, b));
}

console.log(output.join('\n'));