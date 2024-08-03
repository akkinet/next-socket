import { getWebSocketServer } from "next-ws/server"
// There is also a `getHttpServer` function available

export function GET() {
  const wsServer = getWebSocketServer()
  // Response with the number of connected clients
  return Response.json({ count: wsServer.clients.size })
}
