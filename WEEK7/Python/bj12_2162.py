import sys


def find(x):
    if parent[x] == x:
        return x
    parent[x] = find(parent[x])
    return parent[x]


def union(a, b):
    rootA = find(a)
    rootB = find(b)
    if rootA != rootB:
        parent[rootB] = rootA
        size[rootA] += size[rootB]


def ccw(x1, y1, x2, y2, x3, y3):
    temp = (x2 - x1) * (y3 - y1) - (x3 - x1) * (y2 - y1)
    if temp > 0:
        return 1
    elif temp < 0:
        return -1
    return 0


def check(l1, l2):
    x1, y1, x2, y2 = l1
    x3, y3, x4, y4 = l2

    ans1 = ccw(x1, y1, x2, y2, x3, y3)
    ans2 = ccw(x1, y1, x2, y2, x4, y4)
    ans3 = ccw(x3, y3, x4, y4, x1, y1)
    ans4 = ccw(x3, y3, x4, y4, x2, y2)

    if ans1 * ans2 == 0 and ans3 * ans4 == 0:
        return (
            min(x1, x2) <= max(x3, x4)
            and min(x3, x4) <= max(x1, x2)
            and min(y1, y2) <= max(y3, y4)
            and min(y3, y4) <= max(y1, y2)
        )
    return ans1 * ans2 <= 0 and ans3 * ans4 <= 0


n = int(sys.stdin.readline())
lines = []
parent = [i for i in range(n)]
size = [1] * n

for _ in range(n):
    lines.append(list(map(int, sys.stdin.readline().split())))

for i in range(n):
    for j in range(i + 1, n):
        if check(lines[i], lines[j]):
            union(i, j)

group_count = 0
max_size = 0

for i in range(n):
    if parent[i] == i:
        group_count += 1
        max_size = max(max_size, size[i])

print(group_count)
print(max_size)
