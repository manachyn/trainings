package http;

import java.io.BufferedReader;
import java.io.IOException;
import java.io.InputStreamReader;
import java.io.PrintWriter;
import java.net.ServerSocket;
import java.net.Socket;

/**
 * Simple Multi-Threaded Blocking Server
 */
public class MultiThreadedServer implements Runnable {

    private int port;

    /**
     * Create server
     * @param port on which the server will be started
     */
    public MultiThreadedServer(int port) {
        setPort(port);
    }

    /**
     * Start the server
     */
    public void start() {
        System.out.println("Server is running...");
        ServerSocket serverSocket;
        try {
            // Creates a server socket, bound to the specified port
            serverSocket = new ServerSocket(port);
        } catch (IOException e) {
            System.out.println("Failed to create server socket: " + e.getMessage());
            System.exit(0);
            return;
        }
        System.out.println("Waiting for connection...");
        while (true) {
            try {
                // Listens for a connection to be made to server socket and accepts it.
                // The method blocks until a connection is made.
                Socket socket = serverSocket.accept();
                System.out.println("A new connection is accepted: " + socket.getInetAddress().getHostName());
                this.handleConnection(socket);
            } catch(IOException e) {
                System.out.println("Failed to accept connection: " + e.getMessage());
                System.exit(0);
                return;
            }
        }
    }

    public void setPort(int port) {
        this.port = port;
    }

    public int getPort() {
        return port;
    }

    protected void handleConnection(Socket socket) throws IOException {
        // Create an input stream to read input from the client and an output stream
        // that can be used to send information back to the client
        // You can use a generic OutputStream if you want to send binary data.
        // If you want to use the familiar print and println commands, create a PrintWriter
        // You can use an ObjectOutputStream if the client is written in the Java programming language and is expecting complex Java objects
        try (BufferedReader in = new BufferedReader(new InputStreamReader(socket.getInputStream()));
             PrintWriter out = new PrintWriter(socket.getOutputStream(), true)) { // Try-with-resources

            doAnything();

            String line;
            while ((line = in.readLine()) != null) {
                System.out.println(line);
                out.println(line);
            }
            out.flush();


        } finally {
            socket.close();
        }
    }

    private void doAnything() {
        try {
            Thread.sleep(5000);
        } catch (InterruptedException e) {
            e.printStackTrace();
        }
    }

    class Connection extends Thread {
        private Socket serverSocket;

        public Connection(Runnable serverObject, Socket serverSocket) {
            super(serverObject);
            this.serverSocket = serverSocket;
        }

        public Socket getSocket() {
            return serverSocket;
        }
    }

    public static void main(String[] args) {
        int port = 8081;
        if (args.length > 0) {
            port = Integer.parseInt(args[0]);
        }
        MultiThreadedServer server = new MultiThreadedServer(port);
        server.start();
    }
}
