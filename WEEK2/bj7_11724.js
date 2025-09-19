const fs = require('fs');
const input = fs.readFileSync('/dev/stdin').toString().trim().split('\n');

const [n, m] = input[0].split(' ').map(Number);
const edges = input.slice(1);

const adjList = Array.from({ length: n + 1 }, () => []);
const visited = new Array(n + 1).fill(false);

for (let i = 0; i < m; i++) {
    const [u, v] = edges[i].split(' ').map(Number);
    adjList[u].push(v);
    adjList[v].push(u);
}

function dfs(node) {
    visited[node] = true;
    for (const neighbor of adjList[node]) {
        if (!visited[neighbor]) {
            dfs(neighbor);
        }
    }
}

let componentCount = 0;
for (let i = 1; i <= n; i++) {
    if (!visited[i]) {
        componentCount++;
        dfs(i);
    }
}

console.log(componentCount);
