const fs = require('fs');
const [a, b, c] = fs.readFileSync('/dev/stdin').toString().trim().split(' ').map(BigInt);

function extendedGcd(a, b) {
    if (b === 0n) {
        return [a, 1n, 0n];
    }
    const [gcd, x1, y1] = extendedGcd(b, a % b);
    const x = y1;
    const y = x1 - (a / b) * y1;
    return [gcd, x, y];
}

const [gcd_val, x0, y0] = extendedGcd(a, b);

if (c % gcd_val !== 0n) {
    // Problem constraints state a solution always exists
} else {
    const k = c / gcd_val;
    console.log(`${x0 * k} ${y0 * k}`);
}
