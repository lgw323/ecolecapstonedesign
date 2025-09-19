import sys

n = int(sys.stdin.readline())
arr = list(map(int, sys.stdin.readline().split()))

for i in range(1, len(arr)):
    key = arr[i]
    j = i - 1
    while j >= 0 and arr[j] > key:
        arr[j + 1] = arr[j]
        j -= 1
    arr[j + 1] = key

times = [0] * n
times[0] = arr[0]
for i in range(1, len(arr)):
    times[i] = times[i - 1] + arr[i]

result = 0
for time in times:
    result += time

print(result)
