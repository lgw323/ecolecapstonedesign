const fs = require('fs');
const input = fs.readFileSync('/dev/stdin').toString().trim().split('\n');

const n = parseInt(input[0]);
const arr = input[1].split(' ').map(Number).sort((a, b) => a - b);
let count = 0;

for (let i = 0; i < n; i++) {
    const target = arr[i];
    let start = 0;
    let end = n - 1;

    while (start < end) {
        const sum = arr[start] + arr[end];
        if (sum === target) {
            if (start !== i && end !== i) {
                count++;
                break;
            } else if (start === i) {
                start++;
            } else { // end === i
                end--;
            }
        } else if (sum < target) {
            start++;
        } else { // sum > target
            end--;
        }
    }
}
console.log(count);