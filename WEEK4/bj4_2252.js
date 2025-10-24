const fs = require('fs');
const input = fs.readFileSync('/dev/stdin').toString().trim().split('\n');

const [n, m] = input[0].split(' ').map(Number);
const adjList = Array.from({ length: n + 1 }, () => []);
const inDegree = new Array(n + 1).fill(0);

for (let i = 1; i <= m; i++) {
    const [a, b] = input[i].split(' ').map(Number);
    adjList[a].push(b);
    inDegree[b]++;
}

const queue = [];
let head = 0;
for (let i = 1; i <= n; i++) {
    if (inDegree[i] === 0) {
        queue.push(i);
    }
}

const result = [];
while (head < queue.length) {
    const current = queue[head++];
    result.push(current);

    for (const neighbor of adjList[current]) {
        inDegree[neighbor]--;
        if (inDegree[neighbor] === 0) {
            queue.push(neighbor);
        }
    }
}

console.log(result.join(' '));
