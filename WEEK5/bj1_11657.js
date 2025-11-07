const fs = require('fs');
const input = fs.readFileSync('/dev/stdin').toString().trim().split('\n');
let lineIndex = 0;

const [N, M] = input[lineIndex++].split(' ').map(Number);
const edges = [];
const dist = new Array(N + 1).fill(Infinity);

for (let i = 0; i < M; i++) {
    const [A, B, C] = input[lineIndex++].split(' ').map(Number);
    edges.push({ start: A, end: B, time: C });
}

dist[1] = 0;

for (let i = 1; i < N; i++) {
    for (let j = 0; j < M; j++) {
        const edge = edges[j];
        if (dist[edge.start] !== Infinity && dist[edge.end] > dist[edge.start] + edge.time) {
            dist[edge.end] = dist[edge.start] + edge.time;
        }
    }
}

let hasNegativeCycle = false;
for (let j = 0; j < M; j++) {
    const edge = edges[j];
    if (dist[edge.start] !== Infinity && dist[edge.end] > dist[edge.start] + edge.time) {
        hasNegativeCycle = true;
        break;
    }
}

const sb = [];
if (hasNegativeCycle) {
    sb.push("-1");
} else {
    for (let i = 2; i <= N; i++) {
        if (dist[i] === Infinity) {
            sb.push("-1");
        } else {
            sb.push(dist[i]);
        }
    }
}
console.log(sb.join('\n'));