import sys

input = sys.stdin.readline

n, m, k = map(int, input().split())
dp = [[0] * 201 for _ in range(201)]
limit = 1000000000

for i in range(201):
    dp[i][0] = 1
    for j in range(1, i + 1):
        dp[i][j] = dp[i - 1][j - 1] + dp[i - 1][j]
        if dp[i][j] > limit:
            dp[i][j] = limit + 1

if dp[n + m][m] < k:
    print("-1")
else:
    result = []
    while n > 0 or m > 0:
        a_count = dp[n + m - 1][m] if n > 0 else 0
        if n > 0 and k <= a_count:
            result.append("a")
            n -= 1
        else:
            result.append("z")
            k -= a_count
            m -= 1
    print("".join(result))
