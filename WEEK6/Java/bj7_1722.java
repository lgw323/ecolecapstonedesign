import java.io.BufferedReader;
import java.io.IOException;
import java.io.InputStreamReader;
import java.util.StringTokenizer;

public class bj7_1722 {
    public static void main(String[] args) throws IOException {
        BufferedReader br = new BufferedReader(new InputStreamReader(System.in));
        int n = Integer.parseInt(br.readLine());
        StringTokenizer st = new StringTokenizer(br.readLine());
        int option = Integer.parseInt(st.nextToken());

        long[] fact = new long[21];
        fact[0] = 1;
        for (int i = 1; i <= 20; i++) {
            fact[i] = fact[i - 1] * i;
        }

        boolean[] visited = new boolean[21];
        int[] arr = new int[n];

        if (option == 1) {
            long k = Long.parseLong(st.nextToken());
            for (int i = 0; i < n; i++) {
                for (int j = 1; j <= n; j++) {
                    if (visited[j])
                        continue;
                    if (k <= fact[n - 1 - i]) {
                        arr[i] = j;
                        visited[j] = true;
                        break;
                    }
                    k -= fact[n - 1 - i];
                }
            }
            for (int i = 0; i < n; i++) {
                System.out.print(arr[i] + " ");
            }
        } else {
            for (int i = 0; i < n; i++) {
                arr[i] = Integer.parseInt(st.nextToken());
            }
            long result = 1;
            for (int i = 0; i < n; i++) {
                for (int j = 1; j < arr[i]; j++) {
                    if (!visited[j]) {
                        result += fact[n - 1 - i];
                    }
                }
                visited[arr[i]] = true;
            }
            System.out.println(result);
        }
    }
}