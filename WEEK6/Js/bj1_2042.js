const fs = require('fs');
const input = fs.readFileSync('/dev/stdin').toString().trim().split('\n');

const [N, M, K] = input[0].split(' ').map(Number);
const arr = new BigInt64Array(N + 1);
const tree = new BigInt64Array(N * 4);

for (let i = 1; i <= N; i++) {
    arr[i] = BigInt(input[i]);
}

function init(node, start, end) {
    if (start === end) {
        return tree[node] = arr[start];
    }
    const mid = Math.floor((start + end) / 2);
    return tree[node] = init(node * 2, start, mid) + init(node * 2 + 1, mid + 1, end);
}

function update(node, start, end, index, diff) {
    if (index < start || index > end) return;
    tree[node] += diff;
    if (start !== end) {
        const mid = Math.floor((start + end) / 2);
        update(node * 2, start, mid, index, diff);
        update(node * 2 + 1, mid + 1, end, index, diff);
    }
}

function sum(node, start, end, left, right) {
    if (left > end || right < start) return 0n;
    if (left <= start && end <= right) return tree[node];
    const mid = Math.floor((start + end) / 2);
    return sum(node * 2, start, mid, left, right) + sum(node * 2 + 1, mid + 1, end, left, right);
}

init(1, 1, N);

const output = [];
for (let i = N + 1; i < input.length; i++) {
    const [a, b, c] = input[i].split(' ');
    const idx = Number(b);

    if (a === '1') {
        const val = BigInt(c);
        const diff = val - arr[idx];
        arr[idx] = val;
        update(1, 1, N, idx, diff);
    } else {
        output.push(sum(1, 1, N, idx, Number(c)));
    }
}

console.log(output.join('\n'));