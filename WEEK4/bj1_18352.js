const fs = require('fs');
const input = fs.readFileSync('/dev/stdin').toString().trim().split('\n');

const [n, m, k, x] = input[0].split(' ').map(Number);
const adjList = Array.from({ length: n + 1 }, () => []);

for (let i = 1; i <= m; i++) {
    const [u, v] = input[i].split(' ').map(Number);
    adjList[u].push(v);
}

const distance = new Array(n + 1).fill(-1);
const queue = [];
let head = 0;

queue.push(x);
distance[x] = 0;

while (head < queue.length) {
    const current = queue[head++];

    for (const neighbor of adjList[current]) {
        if (distance[neighbor] === -1) {
            distance[neighbor] = distance[current] + 1;
            queue.push(neighbor);
        }
    }
}

const result = [];
for (let i = 1; i <= n; i++) {
    if (distance[i] === k) {
        result.push(i);
    }
}

if (result.length === 0) {
    console.log(-1);
} else {
    console.log(result.join('\n'));
}
