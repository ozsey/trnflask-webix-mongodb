public class A {
    public void run(A a) {
        a.test_method();
    }

    public void test_method() {
        System.out.println("method in class A");
    }
}