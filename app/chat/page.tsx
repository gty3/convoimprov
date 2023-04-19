"use client"

import { useEffect, useState } from "react"
import Chat from "../components/chatComponent"

export default function ChatPage() {
  const [waitingOnAdmin, setWaitingOnAdmin] = useState(true)

  useEffect(() => {
    ;(async () => {
      //api call init
      const initRes = await fetch("/api/initChat")
      console.log("initRes,", initRes)
      // pusher subscribe and wait for connection
    })()
  }, [])

  return <>{waitingOnAdmin ? <div>loading</div> : <Chat username="client" />}</>
}
