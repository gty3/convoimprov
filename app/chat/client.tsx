"use client"

import { useEffect, useState } from "react"
import Chat from "../components/chatComponent"
import Pusher, { Channel } from "pusher-js"
import Head from "next/head"
import OT from "@opentok/client"

export default function Client({
  sessionId,
  token,
}: {
  sessionId: string
  token: string
}) {
  console.log("SESSION", sessionId)
  const [waitingOnAdmin, setWaitingOnAdmin] = useState(true)
  const [pusherChannel, setPusherChannel] = useState<Channel>()

  const initChat = async () => {
    try {
      const otResData = await fetch("/api/initChat")
      console.log("otResData", otResData.body)
      return otResData.body
    } catch (err) {
      console.log("INITCHAT_ERR:", err)
    }
  }

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

  // const channelName = "channel1"
  // const username = "client"

  // useEffect(() => {
  //   console.log("initial use effect, before async")
  //   ;(async () => {
  //     //api call init
  //     const initRes = await fetch("/api/initChat")
  //     console.log("initRes,", initRes)
  //   })()
  //   if (
  //     !process.env.NEXT_PUBLIC_PUSHER_KEY ||
  //     !process.env.NEXT_PUBLIC_PUSHER_CLUSTER
  //   ) {
  //     throw new Error()
  //   }
  //   console.log("initial use effect after async")
  //   const pusher = new Pusher(process.env.NEXT_PUBLIC_PUSHER_KEY, {
  //     cluster: process.env.NEXT_PUBLIC_PUSHER_CLUSTER,
  //   })
  //   const channel = pusher.subscribe(channelName)
  //   setPusherChannel(channel)
  //   return () => {
  //     pusher.unsubscribe(channelName)
  //   }
  // }, [])

  // useEffect(() => {
  //   // console.log('use effect dependent on pusher', pusherChannel)
  //   if (pusherChannel) {
  //     pusherChannel.bind("adminConnected", () => {
  //       console.log("admin connected pusher BIND hit")
  //       setWaitingOnAdmin(false)
  //     })
  //     // pusherChannel.bind("pusher:member_added", (member: any) => { console.log("MEMBER ADDED")})
  //   }
  // }, [pusherChannel])

  return (
    <>
      {/* <Head>
        <script src="https://static.opentok.com/v2.20.1/js/opentok.min.js"></script>
      </Head> */}

      <div className="h-screen">
        {/* {waitingOnAdmin ? <div>loading</div> : <Chat username={username} />} */}
      </div>
    </>
  )
}
