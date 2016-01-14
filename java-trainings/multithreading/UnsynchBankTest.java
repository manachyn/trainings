package multithreading;

import java.util.concurrent.locks.Lock;
import java.util.concurrent.locks.ReentrantLock;

class Bank
{
    private final double[] accounts;

    /**
     * Конструктор объекта, описывающего банк.
     * @param n Количество счетов
     * @param initialBalance Начальная сумма для каждого счета
     */
    public Bank(int n, double initialBalance)
    {
        // Массив счетов
        this.accounts = new double[n];
        for (int i = 0; i < this.accounts.length; i++)
            this.accounts[i] = initialBalance;
    }

    /**
     * Пересылает средства с одного счета на другой.
     * @param from Счет, с которого переводятся средства
     * @param to Счет, на который переводятся средства
     * @param amount Сумма, подлежащая переводу
     */
//    public void transfer(int from, int to, double amount)
//    {
//        if (this.accounts[from] < amount) return;
//        System.out.print(Thread.currentThread());
//        this.accounts[from] -= amount;
//        System.out.printf(" %10.2f from %d to %d", amount, from, to);
//
//        // Эта инструкция не является атомарной, т.е состоит из нескольких операций.
//        // Поток в котором выполняется эта задача может быть прерван на любой из операций
//        this.accounts[to] += amount;
//
//        System.out.printf(" Total Balance: %10.2f%n", getTotalBalance());
//    }

    // Синхронизизированые методы
//    public synchronized void transfer(int from, int to, double amount)
//    {
//        if (this.accounts[from] < amount) return;
//        System.out.print(Thread.currentThread());
//        this.accounts[from] -= amount;
//        System.out.printf(" %10.2f from %d to %d", amount, from, to);
//
//        this.accounts[to] += amount;
//
//        System.out.printf(" Total Balance: %10.2f%n", getTotalBalance());
//    }

    private Lock bankLock = new ReentrantLock();
    public void transfer(int from, int to, double amount)
    {
        bankLock.lock();
        try {
            if (this.accounts[from] < amount) return;
            System.out.print(Thread.currentThread());
            this.accounts[from] -= amount;
            System.out.printf(" %10.2f from %d to %d", amount, from, to);

            this.accounts[to] += amount;

            System.out.printf(" Total Balance: %10.2f%n", getTotalBalance());
        }
        finally {
            bankLock.unlock();
        }
    }

    /**
     * Получение общей суммы на всех счетах
     * @return Общая сумма
     */
    public double getTotalBalance()
    {
        double sum = 0;

        for (double a : this.accounts)
            sum += a;

        return sum;
    }

    /**
     * Получение числа счетов в банке.
     * @return Число счетов
     */
    public int size()
    {
        return this.accounts.length;
    }
}

/**
 * Объект Runnable, который переводит средства с одного счета на другой.
 */
class TransferRunnable implements Runnable
{
    private Bank bank;
    private int fromAccount;
    private double maxAmount;
    private int DELAY = 1000;

    /**
     * Конструктор объекта
     * @param b Банк, между счетами которого переводятся средства
     * @param from Счет, с которого надо переслать средства
     * @param max Максимальный объем пересылаемых средств
     */
    public TransferRunnable(Bank b, int from, double max)
    {
        this.bank = b;
        this.fromAccount = from;
        this.maxAmount = max;
    }

    public void run()
    {
        try
        {
            while (true)
            {
                // Случайно определяем счет, на который будут переводится средства
                int toAccount = (int) (bank.size() * Math.random());
                // Случайно определяем сумму перевода
                double amount = maxAmount * Math.random();
                // Переводим средства
                bank.transfer(fromAccount, toAccount, amount);

                Thread.sleep((int) (DELAY * Math.random()));
            }
        }
        catch (InterruptedException e) {}
    }
}



public class UnsynchBankTest
{
    public static final int NACCOUNTS = 100;
    public static final double INITIAL_BALANCE = 1000;

    public static void main(String[] args)
    {
        Bank b = new Bank(NACCOUNTS, INITIAL_BALANCE);
        int i;
        // Запускаем количество поток-переводов равное количеству счетов
        for (i = 0; i < NACCOUNTS; i++)
        {
            TransferRunnable r = new TransferRunnable(b, i, INITIAL_BALANCE);
            Thread t = new Thread(r);
            t.start();
        }
    }
}


// Основная проблема в том что метод transfer() может быть прерван посередине
