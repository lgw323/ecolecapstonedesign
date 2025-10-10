import sys
import heapq

n = int(sys.stdin.readline())
cards = []
for _ in range(n):
    heapq.heappush(cards, int(sys.stdin.readline()))

total_sum = 0
while len(cards) > 1:
    temp1 = heapq.heappop(cards)
    temp2 = heapq.heappop(cards)

    current_sum = temp1 + temp2
    total_sum += current_sum
    heapq.heappush(cards, current_sum)

print(total_sum)
