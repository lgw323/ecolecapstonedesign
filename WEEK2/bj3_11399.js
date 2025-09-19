const fs = require('fs');
const input = fs.readFileSync('/dev/stdin').toString().trim().split('\n');

const n = parseInt(input[0]);
const arr = input[1].split(' ').map(Number);

for (let i = 1; i < arr.length; i++) {
    let key = arr[i];
    let j = i - 1;
    while (j >= 0 && arr[j] > key) {
        arr[j + 1] = arr[j];
        j--;
    }
    arr[j + 1] = key;
}

const times = new Array(n);
times[0] = arr[0];
for (let i = 1; i < arr.length; i++) {
    times[i] = times[i - 1] + arr[i];
}

let result = 0;
for (let i = 0; i < times.length; i++) {
    result += times[i];
}

console.log(result);
