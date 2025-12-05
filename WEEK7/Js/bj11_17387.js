const fs = require('fs');
const input = fs.readFileSync('/dev/stdin').toString().trim().split('\n');

const [x1, y1, x2, y2] = input[0].split(' ').map(BigInt);
const [x3, y3, x4, y4] = input[1].split(' ').map(BigInt);

function ccw(ax, ay, bx, by, cx, cy) {
    const res = (bx - ax) * (cy - ay) - (cx - ax) * (by - ay);
    if (res > 0n) return 1;
    if (res < 0n) return -1;
    return 0;
}

const ans1 = ccw(x1, y1, x2, y2, x3, y3);
const ans2 = ccw(x1, y1, x2, y2, x4, y4);
const ans3 = ccw(x3, y3, x4, y4, x1, y1);
const ans4 = ccw(x3, y3, x4, y4, x2, y2);

if (ans1 * ans2 === 0 && ans3 * ans4 === 0) {
    let [minX1, maxX1] = x1 < x2 ? [x1, x2] : [x2, x1];
    let [minX3, maxX3] = x3 < x4 ? [x3, x4] : [x4, x3];
    let [minY1, maxY1] = y1 < y2 ? [y1, y2] : [y2, y1];
    let [minY3, maxY3] = y3 < y4 ? [y3, y4] : [y4, y3];

    if (minX1 <= maxX3 && minX3 <= maxX1 && minY1 <= maxY3 && minY3 <= maxY1) {
        console.log(1);
    } else {
        console.log(0);
    }
} else if (ans1 * ans2 <= 0 && ans3 * ans4 <= 0) {
    console.log(1);
} else {
    console.log(0);
}