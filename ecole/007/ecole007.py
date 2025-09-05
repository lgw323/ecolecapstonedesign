from collections import deque

n = int(input())
queue = deque(range(1, n + 1))

while len(queue) > 1:
    queue.popleft()  # 제일 위 카드 버리기
    queue.append(queue.popleft())  # 다음 카드를 제일 아래로

print(queue[0])
