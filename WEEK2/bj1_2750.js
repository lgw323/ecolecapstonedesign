const fs = require('fs');
const input = fs.readFileSync('/dev/stdin').toString().trim().split('\n');

const n = parseInt(input[0]);
const arr = [];
for (let i = 1; i <= n; i++) {
    arr.push(parseInt(input[i]));
}

for (let i = 0; i < n - 1; i++) {
    for (let j = 0; j < n - 1 - i; j++) {
        if (arr[j] > arr[j + 1]) {
            let temp = arr[j];
            arr[j] = arr[j + 1];
            arr[j + 1] = temp;
        }
    }
}

console.log(arr.join('\n'));
