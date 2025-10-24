const fs = require('fs');
const input = fs.readFileSync('/dev/stdin').toString().trim().split('\n');

let lineIndex = 0;
const k = Number(input[lineIndex++]);
const GROUP_A = 1;
const GROUP_B = 2;
let result = '';

function isBipartite(startNode, v, adjList, groups) {
    const queue = [];
    let head = 0;
    queue.push(startNode);
    groups[startNode] = GROUP_A;

    while (head < queue.length) {
        const current = queue[head++];
        const nextGroup = (groups[current] === GROUP_A) ? GROUP_B : GROUP_A;

        for (const neighbor of adjList[current]) {
            if (groups[neighbor] === 0) {
                groups[neighbor] = nextGroup;
                queue.push(neighbor);
            } else if (groups[neighbor] === groups[current]) {
                return false;
            }
        }
    }
    return true;
}

for (let t = 0; t < k; t++) {
    const [v, e] = input[lineIndex++].split(' ').map(Number);
    const adjList = Array.from({ length: v + 1 }, () => []);
    const groups = new Array(v + 1).fill(0);

    for (let i = 0; i < e; i++) {
        const [u, w] = input[lineIndex++].split(' ').map(Number);
        adjList[u].push(w);
        adjList[w].push(u);
    }

    let isBipartiteGraph = true;
    for (let i = 1; i <= v; i++) {
        if (groups[i] === 0) {
            if (!isBipartite(i, v, adjList, groups)) {
                isBipartiteGraph = false;
                break;
            }
        }
    }
    result += (isBipartiteGraph ? "YES" : "NO") + "\n";
}

console.log(result.trim());
