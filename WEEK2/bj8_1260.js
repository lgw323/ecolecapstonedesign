const fs = require('fs');
const input = fs.readFileSync('/dev/stdin').toString().trim().split('\n');

const [n, m, v] = input[0].split(' ').map(Number);
const edges = input.slice(1);

const adjList = Array.from({ length: n + 1 }, () => []);
for (let i = 0; i < m; i++) {
    const [u, w] = edges[i].split(' ').map(Number);
    adjList[u].push(w);
    adjList[w].push(u);
}

for (let i = 1; i <= n; i++) {
    adjList[i].sort((a, b) => a - b);
}

let visited = new Array(n + 1).fill(false);
const dfsResult = [];
function dfs(node) {
    visited[node] = true;
    dfsResult.push(node);

    for (const neighbor of adjList[node]) {
        if (!visited[neighbor]) {
            dfs(neighbor);
        }
    }
}

dfs(v);
console.log(dfsResult.join(' '));

visited = new Array(n + 1).fill(false);
const bfsResult = [];
function bfs(startNode) {
    const queue = [startNode];
    visited[startNode] = true;

    while (queue.length > 0) {
        const node = queue.shift();
        bfsResult.push(node);

        for (const neighbor of adjList[node]) {
            if (!visited[neighbor]) {
                visited[neighbor] = true;
                queue.push(neighbor);
            }
        }
    }
}

bfs(v);
console.log(bfsResult.join(' '));
