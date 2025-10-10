const fs = require('fs');
let n = BigInt(fs.readFileSync('/dev/stdin').toString().trim());

let phi = n;
for (let p = 2n; p * p <= n; p++) {
    if (n % p === 0n) {
        phi = phi / p * (p - 1n);
        while (n % p === 0n) {
            n /= p;
        }
    }
}

if (n > 1n) {
    phi = phi / n * (n - 1n);
}

console.log(phi.toString());
