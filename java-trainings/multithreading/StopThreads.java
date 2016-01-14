package multithreading;

class MyThread extends Thread
{
    public static int threadsCount = 1;
    private final int threadId = threadsCount++;
    @Override
    public void run()
    {
        int i = 0;
        try {
            while(!Thread.currentThread().isInterrupted() && i < 1000) {
                System.out.println("Thread" + threadId + ' ' + i);
                i++;
                sleep(10);
            }
        } catch (InterruptedException e) {
            // Поток прерван в процессе выполнения метода sleep() или wait()
            System.out.println("Sleep or wait interrupted...");
            // Исключение нужно обязательно обработать
            // Способ1
            Thread.currentThread().interrupt(); // чтоб вызывающий метод мог проверить флаг
            // Способ2 - укзать в заговке метода throws InterruptedException


        } finally {

        }

    }
}

public class StopThreads {

    public static void main(String[] args)
    {
        MyThread myThread1 = new MyThread();
        MyThread myThread2 = new MyThread();
        MyThread myThread3 = new MyThread();

        myThread1.start();
        myThread2.start();
        myThread3.start();
        myThread1.interrupt();
        System.out.println("Main thread finished..");
    }
}
