import java.io.BufferedReader;
import java.io.IOException;
import java.io.InputStreamReader;
import java.util.Stack;

public class ecole006 {
    public static void main(String[] args) throws IOException {
        BufferedReader br = new BufferedReader(new InputStreamReader(System.in));
        StringBuilder sb = new StringBuilder();
        int n = Integer.parseInt(br.readLine());
        int[] arr = new int[n];
        for (int i = 0; i < n; i++) {
            arr[i] = Integer.parseInt(br.readLine());
        }

        Stack<Integer> stack = new Stack<>();
        int num = 1;
        boolean ispossible = true;
        for (int i = 0; i < arr.length; i++) {
            int now = arr[i];
            if (now >= num) {
                while (now >= num) {
                    stack.push(num++);
                    sb.append("+\n");
                }
                stack.pop();
                sb.append("-\n");
            } else {
                int upper = stack.peek();
                if (upper > now) {
                    System.out.println("NO");
                    ispossible = false;
                    break;
                } else {
                    stack.pop();
                    sb.append("-\n");
                }
            }
        }
        if (ispossible) {
            System.out.println(sb);
        }
    }
}
