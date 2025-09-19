const fs = require('fs');
const input = fs.readFileSync('/dev/stdin').toString().trim();

const arr = input.split('').map(Number);

for (let i = 0; i < arr.length; i++) {
    let maxIdx = i;
    for (let j = i + 1; j < arr.length; j++) {
        if (arr[j] > arr[maxIdx]) {
            maxIdx = j;
        }
    }
    let temp = arr[i];
    arr[i] = arr[maxIdx];
    arr[maxIdx] = temp;
}

console.log(arr.join(''));
