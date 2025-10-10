import java.io.BufferedReader;
import java.io.IOException;
import java.io.InputStreamReader;
import java.util.Arrays;
import java.util.StringTokenizer;

public class ecole004 {
    public static void main(String[] args) throws IOException {
        BufferedReader br = new BufferedReader(new InputStreamReader(System.in));
        int n = Integer.parseInt(br.readLine());
        long[] arr = new long[n];
        StringTokenizer st = new StringTokenizer(br.readLine());
        for (int i = 0; i < n; i++) {
            arr[i] = Long.parseLong(st.nextToken());
        }
        Arrays.sort(arr);

        int start, end, count = 0;
        long target;
        for (int i = 0; i < arr.length; i++) {
            target = arr[i];
            start = 0;
            end = n - 1;
            while (start < end) {
                if (start == i) {
                    start++;
                    continue;
                } else if (end == i) {
                    end--;
                    continue;
                }
                long sum = arr[start] + arr[end];
                if (sum == target) {
                    count++;
                    break;
                } else if (sum < target) {
                    start++;
                } else if (sum > target) {
                    end--;
                }
            }
        }
        System.out.println(count);
    }
}
