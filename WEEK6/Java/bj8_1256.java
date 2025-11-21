import java.io.BufferedReader;
import java.io.IOException;
import java.io.InputStreamReader;
import java.util.StringTokenizer;

public class bj8_1256 {
    public static void main(String[] args) throws IOException {
        BufferedReader br = new BufferedReader(new InputStreamReader(System.in));
        StringTokenizer st = new StringTokenizer(br.readLine());
        int n = Integer.parseInt(st.nextToken());
        int m = Integer.parseInt(st.nextToken());
        long k = Long.parseLong(st.nextToken());

        long[][] dp = new long[201][201];
        for (int i = 0; i <= 200; i++) {
            dp[i][0] = 1;
            for (int j = 1; j <= i; j++) {
                dp[i][j] = dp[i - 1][j - 1] + dp[i - 1][j];
                if (dp[i][j] > 1000000000)
                    dp[i][j] = 1000000001;
            }
        }

        if (dp[n + m][m] < k) {
            System.out.println("-1");
            return;
        }

        StringBuilder sb = new StringBuilder();
        while (n > 0 || m > 0) {
            long aCount = (n > 0) ? dp[n + m - 1][m] : 0;
            if (n > 0 && k <= aCount) {
                sb.append("a");
                n--;
            } else {
                sb.append("z");
                k -= aCount;
                m--;
            }
        }
        System.out.println(sb);
    }
}