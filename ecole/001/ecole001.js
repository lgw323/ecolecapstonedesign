const fs = require('fs');
const input = fs.readFileSync('/dev/stdin').toString().trim().split('\n');

const n = parseInt(input[0]);
const nums = input[1].split('');

let result = 0;
for (let i = 0; i < n; i++) {
    result += parseInt(nums[i]);
}
console.log(result);