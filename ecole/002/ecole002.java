import java.io.BufferedReader;
import java.io.IOException;
import java.io.InputStreamReader;
import java.util.StringTokenizer;

public class ecole002 {
    public static void main(String[] args) throws IOException {
        BufferedReader br = new BufferedReader(new InputStreamReader(System.in));
        StringTokenizer st = new StringTokenizer(br.readLine());
        int n = Integer.parseInt(st.nextToken());
        int m = Integer.parseInt(st.nextToken());

        int[] arr = new int[n];
        st = new StringTokenizer(br.readLine());
        arr[0] = Integer.parseInt(st.nextToken());
        for (int i = 1; i < arr.length; i++) {
            arr[i] += arr[i - 1] + Integer.parseInt(st.nextToken());
        }

        int mini, maxs;
        for (int i = 0; i < m; i++) {
            st = new StringTokenizer(br.readLine());
            mini = Integer.parseInt(st.nextToken()) - 1;
            maxs = Integer.parseInt(st.nextToken()) - 1;
            if (mini == 0) {
                System.out.println(arr[maxs]);
            } else {
                System.out.println(arr[maxs] - arr[mini - 1]);
            }
        }
    }
}
