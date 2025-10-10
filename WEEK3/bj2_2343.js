const fs = require('fs');
const input = fs.readFileSync('/dev/stdin').toString().trim().split('\n');

const [n, m] = input[0].split(' ').map(Number);
const lectures = input[1].split(' ').map(Number);

let left = Math.max(...lectures);
let right = lectures.reduce((a, b) => a + b, 0);
let result = right;

while (left <= right) {
    const mid = Math.floor((left + right) / 2);
    let count = 1;
    let currentSum = 0;

    for (const lecture of lectures) {
        if (currentSum + lecture > mid) {
            count++;
            currentSum = lecture;
        } else {
            currentSum += lecture;
        }
    }

    if (count <= m) {
        result = mid;
        right = mid - 1;
    } else {
        left = mid + 1;
    }
}

console.log(result);
