import sys

p = []
for _ in range(3):
    p.append(list(map(int, sys.stdin.readline().split())))

result = (p[1][0] - p[0][0]) * (p[2][1] - p[0][1]) - (p[2][0] - p[0][0]) * (
    p[1][1] - p[0][1]
)

if result > 0:
    print(1)
elif result < 0:
    print(-1)
else:
    print(0)
