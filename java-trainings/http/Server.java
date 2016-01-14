package http;

import sun.nio.cs.US_ASCII;

import java.io.*;
import java.net.ServerSocket;
import java.net.Socket;
import java.util.Date;

/**
 * Simple Single-Threaded Blocking Server
 */
public class Server {

    private int port;

    /**
     * Create server
     * @param port on which the server will be started
     */
    public Server(int port) {
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


        //                try (BufferedReader in = new BufferedReader(new InputStreamReader(socket.getInputStream()));
//                     PrintWriter out = new PrintWriter(socket.getOutputStream())) { // Try-with-resources
//                } finally {
//                    socket.close();
//                }
//
//                try (BufferedReader in = new BufferedReader(new InputStreamReader(socket.getInputStream()));
//                     PrintWriter out = new PrintWriter(socket.getOutputStream(), true)) { // Try-with-resources
//                } finally {
//                    socket.close();
//                }
//
//                try (InputStream in = socket.getInputStream(); OutputStream out = socket.getOutputStream()) { // Try-with-resources
//                    byte [] response = new Date().toString().getBytes(US_ASCII.defaultCharset());
//                    out.write(response);
//                } finally {
//                    socket.close();
//                }

        // Create an input stream to read input from the client and an output stream
        // that can be used to send information back to the client
        // You can use a generic OutputStream if you want to send binary data.
        // If you want to use the familiar print and println commands, create a PrintWriter
        // You can use an ObjectOutputStream if the client is written in the Java programming language and is expecting complex Java objects
        try (BufferedReader in = new BufferedReader(new InputStreamReader(socket.getInputStream()));
             PrintWriter out = new PrintWriter(socket.getOutputStream(), true)) { // Try-with-resources
            //in.readLine();

            doAnything();

            StringBuffer buffer = new StringBuffer();
            String line;
            while ((line = in.readLine()) != null) {
//                buffer.append(line).append("\n");
                System.out.println(line);
                out.println(line);
            }
//            String str = buffer.toString();
//            out.println(str);
            out.flush();

//            out.println("HTTP/1.0 200");
//            out.println("Content-type: text/html");
//            out.println("Server-name: myserver");
//            String response = "<html><head>" +
//                    "<title>Simpl Web Page</title></head>\n" +
//                    "<h1>Congratulations!!!</h1>\n" +
//                    "<h3>This page was returned by " + socket.getInetAddress() + "</h3>\n" +
//                    "</html>\n";
//            out.println("Content-length: " + response.length());
//            out.println("");
//            out.println(response);
//            out.flush();
            // No need with try-with-resources
            //out.close();
            //out.close();

        } finally {
            socket.close();
        }
    }

//    public static byte[] readRequest(InputStream in) throws IOException {
//        byte[] buff = new byte[8192];
//        int headerLen = 0;
//        while (true) {
//            int count = in.read(buff);
//            if (count < 0) {
//                throw new RuntimeException("Incoming connection closed");
//            } else {
//                headerLen += count;
//                if (is)
//            }
//        }
//    }

    private void doAnything() {
        try {
            Thread.sleep(5000);
        } catch (InterruptedException e) {
            e.printStackTrace();
        }
    }

    public static void main(String[] args) {
        int port = 8081;
        if (args.length > 0) {
            port = Integer.parseInt(args[0]);
        }
        Server server = new Server(port);
        server.start();
    }
}
