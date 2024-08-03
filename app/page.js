// page.tsx
"use client"

import { useEffect, useRef, useState } from "react"
import { useWebSocket } from "next-ws/client"

export default function Page() {
  const ws = useWebSocket()
  //    ^? WebSocket on the client, null on the server

  const inputRef = useRef(null)
  const [message, setMessage] = useState(null)

  useEffect(() => {
    async function onMessage(event) {
      const payload =
        typeof event.data === "string" ? event.data : await event.data.text()
      // const message = JSON.parse(payload)
      // setMessage(p => [...p, payload])
      setMessage(payload)
    }

    ws?.addEventListener("message", onMessage)
    return () => ws?.removeEventListener("message", onMessage)
  }, [ws])

  return (
    <>
      <input ref={inputRef} type="text" />

      <button onClick={() => ws?.send(inputRef.current?.value ?? "")}>
        Send message to server
      </button>

      <p>
        {message === null
          ? "Waiting to receive message..."
          : `Got message: ${message}`}
      </p>
    </>
  )
}
