import java.io.BufferedReader;
import java.io.IOException;
import java.io.InputStreamReader;
import java.util.StringTokenizer;

public class bj3_11399 {
    public static void main(String[] args) throws IOException {
        BufferedReader br = new BufferedReader(new InputStreamReader(System.in));
        int n = Integer.parseInt(br.readLine());
        StringTokenizer st = new StringTokenizer(br.readLine());
        int[] arr = new int[n];
        int[] times = new int[n];
        for (int i = 0; i < n; i++) {
            arr[i] = Integer.parseInt(st.nextToken());
        }

        int key = 0;
        int j = 0;
        for (int i = 1; i < arr.length; i++) {
            key = arr[i];
            j = i - 1;
            while (j >= 0 && arr[j] > key) {
                arr[j + 1] = arr[j];
                j--;
            }
            arr[j + 1] = key;
        }
        times[0] = arr[0];
        for (int i = 1; i < arr.length; i++) {
            times[i] = times[i - 1] + arr[i];
        }
        int result = 0;
        for (int i = 0; i < times.length; i++) {
            result += times[i];
        }
        System.out.println(result);
    }
}
