const n = parseInt(require('fs').readFileSync('/dev/stdin').toString().trim());

let count = 1;
let start = 1, end = 1;
let sum = 1;

while (end !== n) {
    if (sum === n) {
        count++;
        end++;
        sum += end;
    } else if (sum < n) {
        end++;
        sum += end;
    } else { // sum > n
        sum -= start;
        start++;
    }
}
console.log(count);