const fs = require('fs');
const input = fs.readFileSync('/dev/stdin').toString().trim().split('\n');

const p = [];
for (let i = 0; i < 3; i++) {
    p.push(input[i].split(' ').map(Number));
}

const result = (p[1][0] - p[0][0]) * (p[2][1] - p[0][1]) - (p[2][0] - p[0][0]) * (p[1][1] - p[0][1]);

if (result > 0) console.log(1);
else if (result < 0) console.log(-1);
else console.log(0);