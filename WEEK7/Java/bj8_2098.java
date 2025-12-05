import java.io.*;
import java.util.*;

public class bj8_2098 {
    static int n;
    static int[][] w;
    static int[][] dp;
    static final int INF = 16_000_000;

    public static void main(String[] args) throws IOException {
        BufferedReader br = new BufferedReader(new InputStreamReader(System.in));
        n = Integer.parseInt(br.readLine());
        w = new int[n][n];

        dp = new int[n][(1 << n)];

        for (int i = 0; i < n; i++) {
            StringTokenizer st = new StringTokenizer(br.readLine());
            for (int j = 0; j < n; j++) {
                w[i][j] = Integer.parseInt(st.nextToken());
            }
            Arrays.fill(dp[i], -1);
        }

        System.out.println(tsp(0, 1));
    }

    static int tsp(int current, int visited) {
        if (visited == (1 << n) - 1) {
            return w[current][0] == 0 ? INF : w[current][0];
        }

        if (dp[current][visited] != -1) {
            return dp[current][visited];
        }

        dp[current][visited] = INF;

        for (int i = 0; i < n; i++) {
            if ((visited & (1 << i)) == 0 && w[current][i] != 0) {
                dp[current][visited] = Math.min(dp[current][visited],
                        tsp(i, visited | (1 << i)) + w[current][i]);
            }
        }

        return dp[current][visited];
    }
}