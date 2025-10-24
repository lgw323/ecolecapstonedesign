const fs = require('fs');
const input = fs.readFileSync('/dev/stdin').toString().trim().split('\n');

const [n, m] = input[0].split(' ').map(Number);
const parent = Array.from({ length: n + 1 }, (_, i) => i);

function find(i) {
    if (parent[i] === i) {
        return i;
    }
    return parent[i] = find(parent[i]);
}

function union(a, b) {
    const rootA = find(a);
    const rootB = find(b);
    if (rootA !== rootB) {
        parent[rootB] = rootA;
    }
}

let result = '';
for (let i = 1; i <= m; i++) {
    const [op, a, b] = input[i].split(' ').map(Number);
    if (op === 0) {
        union(a, b);
    } else {
        if (find(a) === find(b)) {
            result += "YES\n";
        } else {
            result += "NO\n";
        }
    }
}

console.log(result.trim());
