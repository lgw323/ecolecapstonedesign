import sys

input = sys.stdin.readline

N, M = map(int, input().split())

setS = set()
for _ in range(N):
    setS.add(input().strip())

count = 0
for _ in range(M):
    if input().strip() in setS:
        count += 1

print(count)
