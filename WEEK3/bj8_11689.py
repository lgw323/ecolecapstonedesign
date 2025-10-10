import sys

n = int(sys.stdin.readline())
phi = n
p = 2
while p * p <= n:
    if n % p == 0:
        phi = phi // p * (p - 1)
        while n % p == 0:
            n //= p
    p += 1

if n > 1:
    phi = phi // n * (n - 1)

print(phi)
