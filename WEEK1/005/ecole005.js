const fs = require('fs');
const input = fs.readFileSync('/dev/stdin').toString().trim().split('\n');

const [n, l] = input[0].split(' ').map(Number);
const numbers = input[1].split(' ').map(Number);

// JS에는 표준 Deque가 없으므로 배열로 흉내냅니다.
const deque = [];
const result = [];

for (let i = 0; i < n; i++) {
    const now = numbers[i];

    while (deque.length > 0 && deque[deque.length - 1][0] >= now) {
        deque.pop();
    }

    deque.push([now, i]);

    if (i - l >= deque[0][1]) {
        deque.shift(); // 배열의 shift는 O(N)이라 비효율적일 수 있지만, 코테 환경에선 통과되는 경우가 많습니다.
    }

    result.push(deque[0][0]);
}

console.log(result.join(' '));