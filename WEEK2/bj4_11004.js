const fs = require('fs');
const input = fs.readFileSync('/dev/stdin').toString().trim().split('\n');

const [n, want] = input[0].split(' ').map(Number);
const arr = input[1].split(' ').map(Number);

function partition(arr, left, right) {
    const pivot = arr[right];
    let i = left - 1;
    for (let j = left; j < right; j++) {
        if (arr[j] < pivot) {
            i++;
            [arr[i], arr[j]] = [arr[j], arr[i]];
        }
    }
    [arr[i + 1], arr[right]] = [arr[right], arr[i + 1]];
    return i + 1;
}

function quickSort(arr, left, right, k) {
    if (left >= right) {
        return;
    }

    const pivotIndex = partition(arr, left, right);

    if (k === pivotIndex) {
        return;
    } else if (pivotIndex > k) {
        quickSort(arr, left, pivotIndex - 1, k);
    } else {
        quickSort(arr, pivotIndex + 1, right, k);
    }
}

quickSort(arr, 0, n - 1, want - 1);
console.log(arr[want - 1]);
