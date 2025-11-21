const fs = require('fs');
const input = fs.readFileSync('/dev/stdin').toString().trim().split('\n');

let lineIdx = 0;
const N = Number(input[lineIdx++]);

const adj = Array.from({ length: N + 1 }, () => []);
const parent = new Int32Array(N + 1);
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
            parent[next] = node;
            stack.push([next, d + 1]);
        }
    }
}

const M = Number(input[lineIdx++]);
const output = [];

function lca(a, b) {
    if (depth[a] < depth[b]) [a, b] = [b, a];

    while (depth[a] !== depth[b]) {
        a = parent[a];
    }

    while (a !== b) {
        a = parent[a];
        b = parent[b];
    }
    return a;
}

for (let i = 0; i < M; i++) {
    const [a, b] = input[lineIdx++].split(' ').map(Number);
    output.push(lca(a, b));
}

console.log(output.join('\n'));