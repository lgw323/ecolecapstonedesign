const fs = require('fs');
const input = fs.readFileSync('/dev/stdin').toString().trim().split('\n');

const n = Number(input[0]);
const meetings = [];
for (let i = 1; i <= n; i++) {
    meetings.push(input[i].split(' ').map(Number));
}

meetings.sort((a, b) => {
    if (a[1] === b[1]) {
        return a[0] - b[0];
    }
    return a[1] - b[1];
});

let count = 0;
let endTime = 0;
for (const meeting of meetings) {
    if (meeting[0] >= endTime) {
        endTime = meeting[1];
        count++;
    }
}

console.log(count);
