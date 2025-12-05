import java.io.*;
import java.util.*;

public class bj9_14003 {
    public static void main(String[] args) throws IOException {
        BufferedReader br = new BufferedReader(new InputStreamReader(System.in));
        int n = Integer.parseInt(br.readLine());

        int[] arr = new int[n];
        StringTokenizer st = new StringTokenizer(br.readLine());
        for (int i = 0; i < n; i++) {
            arr[i] = Integer.parseInt(st.nextToken());
        }

        ArrayList<Integer> lis = new ArrayList<>();
        int[] indexRecord = new int[n];

        for (int i = 0; i < n; i++) {
            if (lis.isEmpty() || lis.get(lis.size() - 1) < arr[i]) {
                indexRecord[i] = lis.size();
                lis.add(arr[i]);
            } else {
                int left = 0, right = lis.size() - 1;
                while (left < right) {
                    int mid = (left + right) / 2;
                    if (lis.get(mid) >= arr[i])
                        right = mid;
                    else
                        left = mid + 1;
                }
                lis.set(right, arr[i]);
                indexRecord[i] = right;
            }
        }

        System.out.println(lis.size());

        Stack<Integer> stack = new Stack<>();
        int targetIdx = lis.size() - 1;

        for (int i = n - 1; i >= 0; i--) {
            if (indexRecord[i] == targetIdx) {
                stack.push(arr[i]);
                targetIdx--;
            }
        }

        StringBuilder sb = new StringBuilder();
        while (!stack.isEmpty()) {
            sb.append(stack.pop()).append(" ");
        }
        System.out.println(sb);
    }
}