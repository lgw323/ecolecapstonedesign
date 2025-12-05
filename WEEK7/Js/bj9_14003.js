const fs = require('fs');
const input = fs.readFileSync('/dev/stdin').toString().trim().split('\n');

const n = Number(input[0]);
const arr = input[1].split(' ').map(Number);

const lis = [];
const indexRecord = new Int32Array(n);

function lowerBound(arr, target) {
    let left = 0;
    let right = arr.length - 1;
    while (left < right) {
        const mid = Math.floor((left + right) / 2);
        if (arr[mid] >= target) right = mid;
        else left = mid + 1;
    }
    return right;
}

for (let i = 0; i < n; i++) {
    if (lis.length === 0 || lis[lis.length - 1] < arr[i]) {
        indexRecord[i] = lis.length;
        lis.push(arr[i]);
    } else {
        const idx = lowerBound(lis, arr[i]);
        lis[idx] = arr[i];
        indexRecord[i] = idx;
    }
}

console.log(lis.length);

const result = [];
let targetIdx = lis.length - 1;

for (let i = n - 1; i >= 0; i--) {
    if (indexRecord[i] === targetIdx) {
        result.push(arr[i]);
        targetIdx--;
    }
}

console.log(result.reverse().join(' '));