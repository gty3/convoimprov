"use client"

import { useEffect, useState } from "react"
import Chat from "../components/chatComponent"
import Pusher from "pusher-js"

export default function ChatPage() {
  const [waitingOnAdmin, setWaitingOnAdmin] = useState(true)

  const channel = "channel1"
  const username = "client"

  useEffect(() => {


    ;(async () => {
      //api call init
      const initRes = await fetch("/api/initChat")
      console.log("initRes,", initRes)
      if (
        !process.env.NEXT_PUBLIC_PUSHER_KEY ||
        !process.env.NEXT_PUBLIC_PUSHER_CLUSTER
      ) {
        throw new Error()
      }
      const pusher = new Pusher(process.env.NEXT_PUBLIC_PUSHER_KEY, {
        cluster: process.env.NEXT_PUBLIC_PUSHER_CLUSTER,
      })
  
      const pusherChannel = pusher.subscribe(channel)
  
      pusherChannel.bind("adminConnected", () => {
          setWaitingOnAdmin(false)

      })
    })()
  }, [])

  return (
    <div className="h-screen">
      {waitingOnAdmin ? <div>loading</div> : <Chat username={username} />}
    </div>
  )
}
