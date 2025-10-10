import sys

def binary_search(arr, target):
    start, end = 0, len(arr) - 1
    while start <= end:
        mid = (start + end) // 2
        if arr[mid] == target:
            return 1
        elif arr[mid] < target:
            start = mid + 1
        else:
            end = mid - 1
    return 0

n = int(sys.stdin.readline())
arr_n = sorted(list(map(int, sys.stdin.readline().split())))
m = int(sys.stdin.readline())
arr_m = list(map(int, sys.stdin.readline().split()))

for target in arr_m:
    print(binary_search(arr_n, target))
