from collections import deque
import sys

n, l = map(int, sys.stdin.readline().split())
numbers = list(map(int, sys.stdin.readline().split()))

dq = deque()
result = []

for i in range(n):
    now = numbers[i]

    # 덱의 마지막 값보다 현재 값이 작으면, 더 큰 값들은 필요 없으므로 제거
    while dq and dq[-1][0] >= now:
        dq.pop()

    dq.append((now, i))

    # 윈도우 범위를 벗어난 값은 덱의 앞에서 제거
    if i - l >= dq[0][1]:
        dq.popleft()

    result.append(str(dq[0][0]))

print(" ".join(result))
