import sys

n = int(sys.stdin.readline())
t = []
p = []
dp = [0] * (n + 1)

for _ in range(n):
    time, pay = map(int, sys.stdin.readline().split())
    t.append(time)
    p.append(pay)

for i in range(n - 1, -1, -1):
    if i + t[i] > n:
        dp[i] = dp[i + 1]
    else:
        dp[i] = max(dp[i + 1], p[i] + dp[i + t[i]])

print(dp[0])
