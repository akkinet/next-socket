const subs = new Set(); // Track connected clients

export function SOCKET(
    client,
    request,
    server,
) {
    subs.add(client);

    console.log('A client connected');

    client.on('message', (message) => {
        console.log('Received message:', message);

        for (const sub of subs) {
            if (sub !== client && sub.readyState === WebSocket.OPEN) {
                sub.send(message);
            }
        }
    });

    client.on('close', () => {
        subs.delete(client);
        console.log('Client disconnected');
    });
}