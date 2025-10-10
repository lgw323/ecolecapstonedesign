const fs = require('fs');
const input = fs.readFileSync('/dev/stdin').toString().trim().split('\n');

const n = parseInt(input[0]);
const arrN = input[1].split(' ').map(Number).sort((a, b) => a - b);
const m = parseInt(input[2]);
const arrM = input[3].split(' ').map(Number);

function binarySearch(arr, target) {
    let start = 0;
    let end = arr.length - 1;
    while (start <= end) {
        let mid = Math.floor((start + end) / 2);
        if (arr[mid] === target) {
            return 1;
        } else if (arr[mid] < target) {
            start = mid + 1;
        } else {
            end = mid - 1;
        }
    }
    return 0;
}

const result = [];
for (let i = 0; i < m; i++) {
    result.push(binarySearch(arrN, arrM[i]));
}

console.log(result.join('\n'));
