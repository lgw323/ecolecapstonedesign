import java.io.BufferedReader;
import java.io.IOException;
import java.io.InputStreamReader;

public class ecole003 {
    public static void main(String[] args) throws IOException {
        BufferedReader br = new BufferedReader(new InputStreamReader(System.in));
        int n = Integer.parseInt(br.readLine());
        int count = 1;
        int sum = 0;
        int sidx = 0;
        int eidx = 0;

        while (eidx != n) {
            if (sum == n) {
                count++;
                eidx++;
                sum += eidx;
            } else if (sum < n) {
                eidx++;
                sum += eidx;
            } else if (sum > n) {
                sum -= sidx;
                sidx++;
            }
        }
        System.out.println(count);
    }
}
