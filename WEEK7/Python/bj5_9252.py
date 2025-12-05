import sys

s1 = sys.stdin.readline().strip()
s2 = sys.stdin.readline().strip()
n = len(s1)
m = len(s2)

dp = [[0] * (m + 1) for _ in range(n + 1)]

for i in range(1, n + 1):
    for j in range(1, m + 1):
        if s1[i - 1] == s2[j - 1]:
            dp[i][j] = dp[i - 1][j - 1] + 1
        else:
            dp[i][j] = max(dp[i - 1][j], dp[i][j - 1])

print(dp[n][m])

result = []
i, j = n, m
while i > 0 and j > 0:
    if dp[i][j] == dp[i - 1][j]:
        i -= 1
    elif dp[i][j] == dp[i][j - 1]:
        j -= 1
    else:
        result.append(s1[i - 1])
        i -= 1
        j -= 1

print("".join(result[::-1]))
