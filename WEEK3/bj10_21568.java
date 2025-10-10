import java.io.BufferedReader;
import java.io.IOException;
import java.io.InputStreamReader;
import java.util.StringTokenizer;

public class bj10_21568 {
    public static void main(String[] args) throws IOException {
        BufferedReader br = new BufferedReader(new InputStreamReader(System.in));
        StringTokenizer st = new StringTokenizer(br.readLine());
        long a = Long.parseLong(st.nextToken());
        long b = Long.parseLong(st.nextToken());
        long c = Long.parseLong(st.nextToken());

        long[] result = extendedGcd(a, b);
        long gcd = result[0];
        long x0 = result[1];
        long y0 = result[2];

        if (c % gcd != 0) {
            // This case is not expected based on the problem constraints
        } else {
            long k = c / gcd;
            System.out.println(x0 * k + " " + y0 * k);
        }
    }

    private static long[] extendedGcd(long a, long b) {
        if (b == 0) {
            return new long[] { a, 1, 0 };
        }
        long[] temp = extendedGcd(b, a % b);
        long gcd = temp[0];
        long x = temp[2];
        long y = temp[1] - (a / b) * temp[2];
        return new long[] { gcd, x, y };
    }
}
