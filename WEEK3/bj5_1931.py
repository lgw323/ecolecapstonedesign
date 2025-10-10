import sys

n = int(sys.stdin.readline())
meetings = []
for _ in range(n):
    start, end = map(int, sys.stdin.readline().split())
    meetings.append((start, end))

meetings.sort(key=lambda x: (x[1], x[0]))

count = 0
end_time = 0
for meeting in meetings:
    if meeting[0] >= end_time:
        end_time = meeting[1]
        count += 1

print(count)
