import sys

lines = sys.stdin.readline().strip()
arr = [int(char) for char in lines]

for i in range(len(arr)):
    max_idx = i
    for j in range(i + 1, len(arr)):
        if arr[j] > arr[max_idx]:
            max_idx = j
    arr[i], arr[max_idx] = arr[max_idx], arr[i]

for i in arr:
    print(i, end="")
