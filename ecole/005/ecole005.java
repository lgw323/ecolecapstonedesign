import java.io.BufferedReader;
import java.io.BufferedWriter;
import java.io.IOException;
import java.io.InputStreamReader;
import java.io.OutputStreamWriter;
import java.util.ArrayDeque;
import java.util.Deque;
import java.util.StringTokenizer;

public class ecole005 {
    public static void main(String[] args) throws IOException {
        BufferedReader br = new BufferedReader(new InputStreamReader(System.in));
        BufferedWriter bw = new BufferedWriter(new OutputStreamWriter(System.out));
        StringTokenizer st = new StringTokenizer(br.readLine());

        int num = Integer.parseInt(st.nextToken());
        int window = Integer.parseInt(st.nextToken());

        st = new StringTokenizer(br.readLine());
        Deque<int[]> deque = new ArrayDeque<>();

        for (int i = 0; i < num; i++) {
            int now = Integer.parseInt(st.nextToken());
            while (!deque.isEmpty() && deque.peekLast()[0] >= now) {
                deque.pollLast();
            }

            deque.offerLast(new int[] { now, i });

            if (i - window >= deque.peekFirst()[1]) {
                deque.pollFirst();
            }
            bw.write(deque.peekFirst()[0] + " ");
        }
        bw.flush();
    }
}
