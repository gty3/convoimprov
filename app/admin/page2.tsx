"use client"

import ChatComponent from "@/app/components/chatComponent"
import { useEffect, useState } from "react"
// import Chat from "../components/chatComponent"
// import Pusher from "pusher-js"

export default function AdminPage({
  params,
}: {
  params: { session: string[] }
}) {
  console.log(params.session[0])

  const [userState, setUserState] = useState(true)

  const channel = "channel1"

  useEffect(() => {
    ;(async () => {
      try {
        await fetch("/api/adminConnected", {
          method: "POST",
          body: JSON.stringify({
            username: "admin",
          }),
        })
      } catch (err) {
        console.log(err)
        console.log("shit errored")
      }
    })()
    // if (
    //   !process.env.NEXT_PUBLIC_PUSHER_KEY ||
    //   !process.env.NEXT_PUBLIC_PUSHER_CLUSTER
    // ) {
    //   throw new Error()
    // }
    // const pusher = new Pusher(process.env.NEXT_PUBLIC_PUSHER_KEY, {
    //   cluster: process.env.NEXT_PUBLIC_PUSHER_CLUSTER,
    // })

    // const pusherChannel = pusher.subscribe(channel)

    // pusherChannel.bind("adminConnected", () => {
    //   setUserState(false)
    // })
  }, [])


  return (
    <div className="h-screen">
      hello
      {/* <ChatComponent username="admin" /> */}
    </div>
  )
  // return userState ? <Chat username="admin" /> : <div className="h-screen">user disconnected</div>
}