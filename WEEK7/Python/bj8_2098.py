import sys

n = int(sys.stdin.readline())
w = [list(map(int, sys.stdin.readline().split())) for _ in range(n)]
dp = [[-1] * (1 << n) for _ in range(n)]
INF = 16000000


def tsp(current, visited):
    if visited == (1 << n) - 1:
        return w[current][0] if w[current][0] > 0 else INF

    if dp[current][visited] != -1:
        return dp[current][visited]

    dp[current][visited] = INF
    for i in range(n):
        if not (visited & (1 << i)) and w[current][i] > 0:
            dp[current][visited] = min(
                dp[current][visited], tsp(i, visited | (1 << i)) + w[current][i]
            )

    return dp[current][visited]


print(tsp(0, 1))
