import sys

n = int(sys.stdin.readline())
x = []
y = []

for _ in range(n):
    a, b = map(int, sys.stdin.readline().split())
    x.append(a)
    y.append(b)

x.append(x[0])
y.append(y[0])

sum_a = 0
sum_b = 0

for i in range(n):
    sum_a += x[i] * y[i + 1]
    sum_b += y[i] * x[i + 1]

print(round(abs(sum_a - sum_b) / 2, 1))
