import sys
from bisect import bisect_left

n = int(sys.stdin.readline())
arr = list(map(int, sys.stdin.readline().split()))

lis = []
index_record = [0] * n

for i in range(n):
    if not lis or lis[-1] < arr[i]:
        index_record[i] = len(lis)
        lis.append(arr[i])
    else:
        idx = bisect_left(lis, arr[i])
        lis[idx] = arr[i]
        index_record[i] = idx

print(len(lis))

result = []
target_idx = len(lis) - 1

for i in range(n - 1, -1, -1):
    if index_record[i] == target_idx:
        result.append(arr[i])
        target_idx -= 1

print(*result[::-1])
