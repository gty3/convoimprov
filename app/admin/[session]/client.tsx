"use client"

import ChatComponent from "@/app/components/chatComponent"
import { useEffect, useState } from "react"
// import Chat from "../components/chatComponent"
// import Pusher from "pusher-js"
import OT from "@opentok/client"

export default function Client({
  sessionId,
  token,
}: {
  sessionId: string
  token: string
}) {
  useEffect(() => {
    ;(async () => {
      const session = OT.initSession(
        process.env.NEXT_PUBLIC_OPENTOK_APIKEY,
        sessionId
      )
      session.connect(token, function (err) {
        if (err) {
          console.log(err)
        }
      })
      session.on("connectionCreated", (event) => {
        const eventConnectionId = event.connection.connectionId
        const thisConnectionId = session.connection?.connectionId
        console.log("eventConnectionId", eventConnectionId)
        console.log("thisConnectionId", thisConnectionId)
      })
    })()
  }, [])

  return (
    <div className="h-screen">
      hello
      {/* <ChatComponent username="admin" /> */}
    </div>
  )
  // return userState ? <Chat username="admin" /> : <div className="h-screen">user disconnected</div>
}
