"use client"
import dynamic from "next/dynamic"
import { SyntheticEvent, useEffect, useRef, useState } from "react"
import { Session } from "@opentok/client"

import Image from "next/image"
import { debounce } from "debounce"
import CustomSpinner from "./spinner"
import { useRouter } from "next/navigation"
import Connecting from "./connecting"

export default function ChatComponent({
  sessionId,
  token,
}: {
  sessionId: string
  token: string
}) {
  // const [adminConnected, setAdminConnected] = useState(false)

  const [sentText, setSentText] = useState<string>()
  const [receivedText, setReceivedText] = useState<string>()

  const [session, setSession] = useState<Session>()

  const textRef = useRef<HTMLInputElement>(null)

  const router = useRouter()

  const messageDebounced = debounce(async () => {
    if (!session) return
    if (textRef.current) {
      const textInput = textRef.current.value
      setSentText(textInput)
      session.signal(
        { type: "signal", data: "" + textInput },
        function signalCallback(err) {
          if (err) {
            console.log("signal-error", err)
          }
        }
      )
      textRef.current.value = ""
    }
  }, 700)

  const handleTextChange = async (e: SyntheticEvent) => {
    messageDebounced()
  }

  useEffect(() => {
    ;(async () => {
      const OT = (await import("@opentok/client")).default
      const otSession = OT.initSession(
        process.env.NEXT_PUBLIC_OPENTOK_APIKEY,
        sessionId
      )
      setSession(otSession)
    })()
  }, [sessionId])

  useEffect(() => {
    if (!session) return
    session.connect(token, function (err) {
      if (err) {
        console.log("session-connect-error:::", err)
      }
    })
    // session.on("connectionCreated", (event) => {
    //   const eventConnectionId = event.connection.connectionId
    //   const thisConnectionId = session.connection?.connectionId
    //   if (eventConnectionId !== thisConnectionId) {
    //     setAdminConnected(true)
    //   }
    // })
    session.on("connectionDestroyed", () => {
      console.log("connection destroyed")
      router.push("/")
    })
    session.on("signal", (event) => {
      console.log("signal???", event)
      if (event.from?.connectionId !== session.connection?.connectionId) {
        setReceivedText(event.data)
      }
    })
    return () => { session.disconnect() }
  }, [session, token])

  return (
    <div className="h-96 w-96">
      <div className="absolute inset-x-0 bottom-10 w-96">
        <div className="flex justify-center pt-2">
          <div className="relative w-60 h-60">
            <Image
              src="/cafe_eating_dark.jpg"
              fill={true}
              alt="guy eating at cafe"
              className="flex items-center justify-center border border-black"
            />
            <div className="p-2 z-1 text-lg absolute bottom-0 text-white drop-shadow-[2px_2px_2px_rgba(0,0,0,0.8)]">
              {/* Hey hows it going, this is default tttt text, my name is geoff, lol that always gets a chuckle - my name is geoff. Im sitting here eating */}
              {receivedText}
            </div>
          </div>
        </div>
        <div className="flex justify-center">
          <div className="p-1.5 text-lg w-80 h-16">
            {/* Hi I'm a stranger looking to talk, ttttt this is random default text */}
            {sentText}
          </div>
        </div>
        <div className="flex justify-center">
          <input
            autoFocus
            autoComplete="off"
            className="px-2 py-1 border-2 border-black rounded-lg w-80 dark:text-black"
            onChange={(e) => handleTextChange(e)}
            ref={textRef}
          />
        </div>
      </div>
    </div>
  )
}
