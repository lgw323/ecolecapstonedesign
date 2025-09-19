import java.io.BufferedReader;
import java.io.IOException;
import java.io.InputStreamReader;

public class bj2_1427 {
    public static void main(String[] args) throws IOException {
        BufferedReader br = new BufferedReader(new InputStreamReader(System.in));
        String lines = br.readLine();
        int[] arr = new int[lines.length()];
        for (int i = 0; i < arr.length; i++) {
            arr[i] = Integer.parseInt(lines.substring(i, i + 1));
        }

        int max = 0;
        int tmp = 0;
        for (int i = 0; i < arr.length; i++) {
            max = i;
            for (int j = i + 1; j < arr.length; j++) {
                if (arr[j] > arr[max]) {
                    max = j;
                }
            }
            tmp = arr[i];
            arr[i] = arr[max];
            arr[max] = tmp;
        }
        for (int i : arr) {
            System.out.print(i);
        }
    }
}
