import java.io.BufferedReader;
import java.io.IOException;
import java.io.InputStreamReader;

public class bj6_1541 {
    public static void main(String[] args) throws IOException {
        BufferedReader br = new BufferedReader(new InputStreamReader(System.in));
        String[] subtraction = br.readLine().split("-");
        int result = 0;

        for (int i = 0; i < subtraction.length; i++) {
            int tempSum = 0;
            String[] addition = subtraction[i].split("\\+");
            for (String s : addition) {
                tempSum += Integer.parseInt(s);
            }

            if (i == 0) {
                result += tempSum;
            } else {
                result -= tempSum;
            }
        }
        System.out.println(result);
    }
}
