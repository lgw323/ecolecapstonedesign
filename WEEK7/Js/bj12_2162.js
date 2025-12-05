const fs = require('fs');
const input = fs.readFileSync('/dev/stdin').toString().trim().split('\n');

const n = Number(input[0]);
const lines = [];
for (let i = 1; i <= n; i++) {
    lines.push(input[i].split(' ').map(BigInt));
}

const parent = Array.from({ length: n }, (_, i) => i);
const size = new Int32Array(n).fill(1);

function find(x) {
    if (parent[x] === x) return x;
    return parent[x] = find(parent[x]);
}

function union(a, b) {
    const rootA = find(a);
    const rootB = find(b);
    if (rootA !== rootB) {
        parent[rootB] = rootA;
        size[rootA] += size[rootB];
    }
}

function ccw(ax, ay, bx, by, cx, cy) {
    const res = (bx - ax) * (cy - ay) - (cx - ax) * (by - ay);
    if (res > 0n) return 1;
    if (res < 0n) return -1;
    return 0;
}

function check(l1, l2) {
    const [x1, y1, x2, y2] = l1;
    const [x3, y3, x4, y4] = l2;

    const ans1 = ccw(x1, y1, x2, y2, x3, y3);
    const ans2 = ccw(x1, y1, x2, y2, x4, y4);
    const ans3 = ccw(x3, y3, x4, y4, x1, y1);
    const ans4 = ccw(x3, y3, x4, y4, x2, y2);

    if (ans1 * ans2 === 0 && ans3 * ans4 === 0) {
        const [minX1, maxX1] = x1 < x2 ? [x1, x2] : [x2, x1];
        const [minX3, maxX3] = x3 < x4 ? [x3, x4] : [x4, x3];
        const [minY1, maxY1] = y1 < y2 ? [y1, y2] : [y2, y1];
        const [minY3, maxY3] = y3 < y4 ? [y3, y4] : [y4, y3];
        return minX1 <= maxX3 && minX3 <= maxX1 && minY1 <= maxY3 && minY3 <= maxY1;
    }
    return ans1 * ans2 <= 0 && ans3 * ans4 <= 0;
}

for (let i = 0; i < n; i++) {
    for (let j = i + 1; j < n; j++) {
        if (check(lines[i], lines[j])) {
            union(i, j);
        }
    }
}

let groupCount = 0;
let maxSize = 0;

for (let i = 0; i < n; i++) {
    if (parent[i] === i) {
        groupCount++;
        if (size[i] > maxSize) maxSize = size[i];
    }
}

console.log(groupCount);
console.log(maxSize);