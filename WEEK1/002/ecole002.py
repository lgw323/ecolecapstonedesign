import sys

n, m = map(int, sys.stdin.readline().split())
numbers = list(map(int, sys.stdin.readline().split()))

prefix_sum = [0] * (n + 1)
for i in range(n):
    prefix_sum[i + 1] = prefix_sum[i] + numbers[i]

for _ in range(m):
    i, j = map(int, sys.stdin.readline().split())
    result = prefix_sum[j] - prefix_sum[i - 1]
    print(result)
