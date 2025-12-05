import java.io.*;
import java.util.*;

public class bj13_2166 {
    public static void main(String[] args) throws IOException {
        BufferedReader br = new BufferedReader(new InputStreamReader(System.in));
        int n = Integer.parseInt(br.readLine());
        long[][] p = new long[n + 1][2];

        for (int i = 0; i < n; i++) {
            StringTokenizer st = new StringTokenizer(br.readLine());
            p[i][0] = Long.parseLong(st.nextToken());
            p[i][1] = Long.parseLong(st.nextToken());
        }
        p[n][0] = p[0][0];
        p[n][1] = p[0][1];

        long sumA = 0;
        long sumB = 0;

        for (int i = 0; i < n; i++) {
            sumA += p[i][0] * p[i + 1][1];
            sumB += p[i][1] * p[i + 1][0];
        }

        System.out.printf("%.1f", Math.abs(sumA - sumB) / 2.0);
    }
}