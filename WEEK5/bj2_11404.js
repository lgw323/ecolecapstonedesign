const fs = require('fs');
const input = fs.readFileSync('/dev/stdin').toString().trim().split('\n');
let lineIndex = 0;

const n = parseInt(input[lineIndex++]);
const m = parseInt(input[lineIndex++]);

const INF = Infinity;
const dist = Array.from({ length: n + 1 }, () => new Array(n + 1).fill(INF));

for (let i = 1; i <= n; i++) {
    dist[i][i] = 0;
}

for (let i = 0; i < m; i++) {
    const [a, b, c] = input[lineIndex++].split(' ').map(Number);
    dist[a][b] = Math.min(dist[a][b], c);
}

for (let k = 1; k <= n; k++) {
    for (let i = 1; i <= n; i++) {
        for (let j = 1; j <= n; j++) {
            dist[i][j] = Math.min(dist[i][j], dist[i][k] + dist[k][j]);
        }
    }
}

const sb = [];
for (let i = 1; i <= n; i++) {
    const row = [];
    for (let j = 1; j <= n; j++) {
        if (dist[i][j] === INF) {
            row.push("0");
        } else {
            row.push(dist[i][j]);
        }
    }
    sb.push(row.join(' '));
}
console.log(sb.join('\n'));