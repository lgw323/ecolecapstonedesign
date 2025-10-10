import sys


def extended_gcd(a, b):
    if b == 0:
        return a, 1, 0
    gcd, x1, y1 = extended_gcd(b, a % b)
    x = y1
    y = x1 - (a // b) * y1
    return gcd, x, y


a, b, c = map(int, sys.stdin.readline().split())

gcd_val, x0, y0 = extended_gcd(a, b)

if c % gcd_val != 0:
    pass
else:
    k = c // gcd_val
    print(x0 * k, y0 * k)
