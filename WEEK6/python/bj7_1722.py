import sys

input = sys.stdin.readline

n = int(input())
query = list(map(int, input().split()))
option = query[0]

fact = [1] * 21
for i in range(1, 21):
    fact[i] = fact[i - 1] * i

visited = [False] * 21

if option == 1:
    k = query[1]
    result = []
    for i in range(n):
        for j in range(1, n + 1):
            if visited[j]:
                continue
            if k <= fact[n - 1 - i]:
                result.append(j)
                visited[j] = True
                break
            k -= fact[n - 1 - i]
    print(*result)
else:
    arr = query[1:]
    result = 1
    for i in range(n):
        for j in range(1, arr[i]):
            if not visited[j]:
                result += fact[n - 1 - i]
        visited[arr[i]] = True
    print(result)
