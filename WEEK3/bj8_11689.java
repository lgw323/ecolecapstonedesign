import java.io.BufferedReader;
import java.io.IOException;
import java.io.InputStreamReader;

public class bj8_11689 {
    public static void main(String[] args) throws IOException {
        BufferedReader br = new BufferedReader(new InputStreamReader(System.in));
        long n = Long.parseLong(br.readLine());
        long phi = n;

        for (long p = 2; p * p <= n; p++) {
            if (n % p == 0) {
                phi = phi / p * (p - 1);
                while (n % p == 0) {
                    n /= p;
                }
            }
        }

        if (n > 1) {
            phi = phi / n * (n - 1);
        }

        System.out.println(phi);
    }
}
