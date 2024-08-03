"use client"

import { WebSocketProvider } from "next-ws/client"

export default function Layout({ children }) {
  return (
    <html>
      <body>
        <WebSocketProvider url="ws://localhost:3000/api/ws">
          {children}
        </WebSocketProvider>
      </body>
    </html>
  )
}
