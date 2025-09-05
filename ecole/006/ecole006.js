const fs = require('fs');
const input = fs.readFileSync('/dev/stdin').toString().trim().split('\n').map(Number);
const n = input[0];

const stack = [];
const result = [];
let num = 1;
let isPossible = true;

for (let i = 1; i <= n; i++) {
    const target = input[i];
    while (num <= target) {
        stack.push(num);
        result.push('+');
        num++;
    }

    if (stack[stack.length - 1] === target) {
        stack.pop();
        result.push('-');
    } else {
        isPossible = false;
        break;
    }
}

if (isPossible) {
    console.log(result.join('\n'));
} else {
    console.log('NO');
}