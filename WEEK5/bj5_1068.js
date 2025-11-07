const fs = require('fs');
const input = fs.readFileSync('/dev/stdin').toString().trim().split('\n');
let lineIndex = 0;

const N = parseInt(input[lineIndex++]);
const parentInfo = input[lineIndex++].split(' ').map(Number);
const deleted = parseInt(input[lineIndex++]);

const arr = Array.from({ length: N }, () => []);
let root = -1;
let leafcount = 0;

for (let now = 0; now < N; now++) {
    const parent = parentInfo[now];
    if (parent === -1) {
        root = now;
    } else {
        arr[parent].push(now);
    }
}

function DFS(number) {
    let isLeaf = true;
    for (const child of arr[number]) {
        if (child === deleted) {
            continue;
        }
        isLeaf = false;
        DFS(child);
    }
    if (isLeaf) {
        leafcount++;
    }
}

if (deleted === root) {
    console.log(0);
} else {
    DFS(root);
    console.log(leafcount);
}