const fs = require('fs');
const input = fs.readFileSync('/dev/stdin').toString().trim().split('\n');

const n = parseInt(input[0]);
const arr = [];
for (let i = 1; i <= n; i++) {
    arr.push(parseInt(input[i]));
}

function radixSort(arr) {
    const maxVal = Math.max(...arr);
    const maxDigit = String(maxVal).length;

    let radix = 1;
    for (let i = 0; i < maxDigit; i++) {
        const buckets = Array.from({ length: 10 }, () => []);
        for (let j = 0; j < arr.length; j++) {
            const digit = Math.floor(arr[j] / radix) % 10;
            buckets[digit].push(arr[j]);
        }

        arr = [].concat(...buckets);
        radix *= 10;
    }
    return arr;
}

const sortedArr = radixSort(arr);
console.log(sortedArr.join('\n'));
