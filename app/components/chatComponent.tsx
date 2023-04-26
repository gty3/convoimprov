"use client"
import dynamic from "next/dynamic"
import { SyntheticEvent, useEffect, useRef, useState } from "react"
import { Session } from "@opentok/client"

import Image from "next/image"
import { debounce } from "debounce"
import CustomSpinner from "./spinner"

export default function ChatComponent({
  sessionId,
  token,
}: {
  sessionId: string
  token: string
}) {
  console.log("ChatCompRendered-SessionId::", sessionId)
  const [adminConnected, setAdminConnected] = useState(false)

  const [sentText, sentSentText] = useState<string>()
  const [receivedText, setReceivedText] = useState<string>()

  const [session, setSession] = useState<Session>()

  const messageRef = useRef<any>(null)

  const messageDebounced = debounce(async () => {
    if (!messageRef.current) return
    if (!session) return
    sentSentText(messageRef.current.value)
    session.signal(
      { type: "signal", data: "" + messageRef.current.value },
      function signalCallback(err) {
        if (err) {
          console.log("signal-error", err)
        }
      }
    )
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
    session.on("connectionCreated", (event) => {
      const eventConnectionId = event.connection.connectionId
      const thisConnectionId = session.connection?.connectionId
      if (eventConnectionId !== thisConnectionId) {
        setAdminConnected(true)
      }
    })
    session.on("connectionDestroyed", () => {
      console.log("connection destroyed")
    })
    session.on("signal", (event) => {
      console.log("signal???", event)
      if (event.from?.connectionId !== session.connection?.connectionId) {
        setReceivedText(event.data)
      }
    })
  }, [session, token])

  const DesktopComponent = () => {
    return (
      <div className="h-96">
        {/* <div className="w-96"> */}
        <div className="absolute flex justify-center pt-2 bottom-20 md:relative md:pt-10">
          <div className="relative opacity-100 w-80 h-80">
            <Image
              src="/cafe_eating_dark.jpg"
              fill={true}
              alt="guy eating at cafe"
              className="flex items-center justify-center border border-black"
            />
            <div className="p-2 z-1 text-lg text-white drop-shadow-[2px_2px_2px_rgba(0,0,0,0.8)]">
              {/* Hey hows it going, this is default tttt text, my name is geoff, lol that always gets a chuckle - my name is geoff. Im sitting here eating */}
              {receivedText}
            </div>
          </div>
        </div>
        <div className="flex justify-center">
          <div className="p-1.5 md:py-2 text-lg w-80 h-16">
            {/* Hi I'm a stranger looking to talk, ttttt this is random default text */}
            {sentText}
          </div>
        </div>
        <div className="justify-center hidden sm:hidden md:flex md:mt-20">
          <textarea
            autoFocus
            autoComplete="off"
            rows={4}
            className="px-1 border border-black w-80 dark:text-black"
            onChange={(e) => handleTextChange(e)}
            ref={messageRef}
          />
        </div>
        {/* </div> */}
      </div>
    )
  }

  const MobileComponent = () => {
    return (
      <div className="h-96 w-96">
        <div className="absolute inset-x-0 bottom-20 w-96">
          <div className="flex justify-center pt-2">
            <div className="relative w-60 h-60">
              <Image
                src="/cafe_eating_dark.jpg"
                fill={true}
                alt="guy eating at cafe"
                className="flex items-center justify-center border border-black"
              />
              <div className="p-2 z-1 text-lg text-white drop-shadow-[2px_2px_2px_rgba(0,0,0,0.8)]">
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
              // autoFocus
              autoComplete="off"
              className="px-1 border border-black w-80 dark:text-black"
              onChange={(e) => handleTextChange(e)}
              ref={messageRef}
            />
          </div>
        </div>
      </div>
    )
  }

  return !adminConnected ? (
    <>
      <div className="md:hidden">
        <MobileComponent />
      </div>
      <div className="hidden md:flex">
        <DesktopComponent />
      </div>
    </>
  ) : (
    <div className="flex justify-center pt-64">
      <div className="grid grid-cols">
        <CustomSpinner className="flex justify-center" />
        <div className="flex justify-center px-4 pt-6">
          Connecting. This can take a minute
        </div>
      </div>
    </div>
  )
}
