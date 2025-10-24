import sys
from collections import deque

input = sys.stdin.readline
n = int(input())

adjList = [[] for _ in range(n + 1)]
inDegree = [0] * (n + 1)
buildTime = [0] * (n + 1)
resultTime = [0] * (n + 1)

for i in range(1, n + 1):
    line = list(map(int, input().split()))
    buildTime[i] = line[0]
    resultTime[i] = line[0]
    for j in range(1, len(line) - 1):
        pre = line[j]
        adjList[pre].append(i)
        inDegree[i] += 1

queue = deque()
for i in range(1, n + 1):
    if inDegree[i] == 0:
        queue.append(i)

while queue:
    current = queue.popleft()
    for next_node in adjList[current]:
        resultTime[next_node] = max(
            resultTime[next_node], resultTime[current] + buildTime[next_node]
        )
        inDegree[next_node] -= 1
        if inDegree[next_node] == 0:
            queue.append(next_node)

for i in range(1, n + 1):
    print(resultTime[i])
