const n = parseInt(require('fs').readFileSync('/dev/stdin').toString().trim());

// JS에는 표준 Queue가 없으므로 배열로 흉내냅니다.
const queue = Array.from({ length: n }, (_, i) => i + 1);
let head = 0;

// shift()는 비효율적이므로, 포인터를 이동시키는 방식으로 큐를 구현합니다.
while (queue.length - head > 1) {
    head++; // 제일 위 카드 버리기 (인덱스 이동)
    queue.push(queue[head]); // 다음 카드를 제일 아래로
    head++;
}

console.log(queue[head]);