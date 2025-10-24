const fs = require('fs');
const input = fs.readFileSync('/dev/stdin').toString().trim().split('\n');

const n = Number(input[0]);
const adjList = Array.from({ length: n + 1 }, () => []);
const inDegree = new Array(n + 1).fill(0);
const buildTime = new Array(n + 1).fill(0);
const resultTime = new Array(n + 1).fill(0);

for (let i = 1; i <= n; i++) {
    const line = input[i].split(' ').map(Number);
    buildTime[i] = line[0];
    resultTime[i] = line[0];

    for (let j = 1; j < line.length - 1; j++) {
        const pre = line[j];
        adjList[pre].push(i);
        inDegree[i]++;
    }
}

const queue = [];
let head = 0;
for (let i = 1; i <= n; i++) {
    if (inDegree[i] === 0) {
        queue.push(i);
    }
}

while (head < queue.length) {
    const current = queue[head++];

    for (const next of adjList[current]) {
        resultTime[next] = Math.max(resultTime[next], resultTime[current] + buildTime[next]);
        inDegree[next]--;

        if (inDegree[next] === 0) {
            queue.push(next);
        }
    }
}

let result = '';
for (let i = 1; i <= n; i++) {
    result += resultTime[i] + '\n';
}
console.log(result.trim());
