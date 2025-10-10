import java.io.BufferedReader;
import java.io.IOException;
import java.io.InputStreamReader;
import java.util.StringTokenizer;

public class bj2_2343 {
    public static void main(String[] args) throws IOException {
        BufferedReader br = new BufferedReader(new InputStreamReader(System.in));
        StringTokenizer st = new StringTokenizer(br.readLine());
        int n = Integer.parseInt(st.nextToken());
        int m = Integer.parseInt(st.nextToken());

        int[] lectures = new int[n];
        st = new StringTokenizer(br.readLine());

        long sum = 0;
        int maxLecture = 0;

        for (int i = 0; i < n; i++) {
            lectures[i] = Integer.parseInt(st.nextToken());
            sum += lectures[i];
            if (lectures[i] > maxLecture) {
                maxLecture = lectures[i];
            }
        }

        long left = maxLecture;
        long right = sum;

        while (left <= right) {
            long mid = (left + right) / 2;
            int count = 1;
            long currentSum = 0;

            for (int lecture : lectures) {
                if (currentSum + lecture > mid) {
                    count++;
                    currentSum = lecture;
                } else {
                    currentSum += lecture;
                }
            }

            if (count <= m) {
                right = mid - 1;
            } else {
                left = mid + 1;
            }
        }
        System.out.println(left);
    }
}