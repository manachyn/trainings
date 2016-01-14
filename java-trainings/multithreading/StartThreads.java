package multithreading;

class Task implements Runnable
{
    public void run()
    {
        try {
            Thread.sleep(5000);
        } catch (InterruptedException e) {
            e.printStackTrace();
        }
        System.out.println("Secondary thread1 finished...");
    }
}


class AffableThread extends Thread
{
    @Override
    public void run()
    {
        try {
            sleep(5000);
        } catch (InterruptedException e) {
            e.printStackTrace();
        }
        System.out.println("Secondary thread3 finished...");
    }
}

public class StartThreads
{

    public static void main(String[] args)
    {
        // Method 1 - implement Runnable interface
        Task mTask = new Task();
        Thread myThread1 = new Thread(mTask);
        myThread1.start();


        // Using anonymous inner classes
        Thread myThread2 = new Thread(new Runnable()
        {
            public void run()
            {
                System.out.println("Secondary thread2 finished...");
            }
        });
        myThread2.start();


        // Method 2 - extend Thread
        AffableThread mThread3 = new AffableThread();	//Создание потока
        mThread3.start();

        System.out.println("Main thread finished..");
    }
}
