import java.io.BufferedReader;
import java.io.IOException;
import java.io.InputStreamReader;

public class ecole001 {
    public static void main(String[] args) throws IOException {
        BufferedReader br = new BufferedReader(new InputStreamReader(System.in));
        int n = Integer.parseInt(br.readLine());
        String lines[] = br.readLine().split("");
        int result = 0;
        for (String string : lines) {
            result += Integer.parseInt(string);
        }
        System.out.println(result);
    }
}