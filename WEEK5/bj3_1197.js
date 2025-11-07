const fs = require('fs');
const input = fs.readFileSync('/dev/stdin').toString().trim().split('\n');
let lineIndex = 0;

const [V, E] = input[lineIndex++].split(' ').map(Number);
const edges = [];

for (let i = 0; i < E; i++) {
    const [A, B, C] = input[lineIndex++].split(' ').map(Number);
    edges.push({ start: A, end: B, weight: C });
}

edges.sort((a, b) => a.weight - b.weight);

const parent = Array.from({ length: V + 1 }, (_, i) => i);

function find(x) {
    if (parent[x] === x) {
        return x;
    }
    return parent[x] = find(parent[x]);
}

function union(x, y) {
    const rootX = find(x);
    const rootY = find(y);
    if (rootX !== rootY) {
        parent[rootY] = rootX;
    }
}

let totalWeight = 0;
let edgeCount = 0;

for (const edge of edges) {
    if (find(edge.start) !== find(edge.end)) {
        union(edge.start, edge.end);
        totalWeight += edge.weight;
        edgeCount++;
    }
    if (edgeCount === V - 1) {
        break;
    }
}

console.log(totalWeight);