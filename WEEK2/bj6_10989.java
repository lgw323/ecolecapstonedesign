import java.io.BufferedReader;
import java.io.BufferedWriter;
import java.io.IOException;
import java.io.InputStreamReader;
import java.io.OutputStreamWriter;

public class bj6_10989 {

    public static void main(String[] args) throws IOException {
        BufferedReader br = new BufferedReader(new InputStreamReader(System.in));
        BufferedWriter bw = new BufferedWriter(new OutputStreamWriter(System.out));

        int n = Integer.parseInt(br.readLine());
        int[] arr = new int[n];

        for (int i = 0; i < n; i++) {
            arr[i] = Integer.parseInt(br.readLine());
        }

        br.close();

        radixSort(arr, 5);

        for (int val : arr) {
            bw.write(val + "\n");
        }

        bw.flush();
        bw.close();
    }

    private static void radixSort(int[] arr, int maxDigit) {
        int[] result = new int[arr.length];
        int radix = 1;

        for (int d = 0; d < maxDigit; d++) {
            int[] count = new int[10];

            for (int i = 0; i < arr.length; i++) {
                count[(arr[i] / radix) % 10]++;
            }

            for (int i = 1; i < 10; i++) {
                count[i] += count[i - 1];
            }

            for (int i = arr.length - 1; i >= 0; i--) {
                int digit = (arr[i] / radix) % 10;
                result[count[digit] - 1] = arr[i];
                count[digit]--;
            }

            System.arraycopy(result, 0, arr, 0, arr.length);
            radix *= 10;
        }
    }
}
