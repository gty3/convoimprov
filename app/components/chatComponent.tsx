"use client"

import { SyntheticEvent, useEffect, useRef, useState } from "react"
import OT, { Session } from "@opentok/client"
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

  const ChatInput = () => {
    return (
      <div className="justify-center hidden sm:hidden lg:flex lg:mt-20">
        <textarea
          autoFocus
          autoComplete="off"
          rows={4}
          className="px-1 border border-black w-80 dark:text-black"
          onChange={(e) => handleTextChange(e)}
          ref={messageRef}
        />
      </div>
    )
  }
  const ChatInputMobile = () => {
    return (
      <div className="flex justify-center lg:hidden lg:mt-20">
      <input
        autoFocus
        autoComplete="off"
        // rows={4}
        className="px-1 border border-black w-80 dark:text-black"
        onChange={(e) => handleTextChange(e)}
        ref={messageRef}
      />
    </div>
    )
  }

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
    const otSession = OT.initSession(
      process.env.NEXT_PUBLIC_OPENTOK_APIKEY,
      sessionId
    )
    setSession(otSession)
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

  return (
    <>
      <div className="h-screen">
        {!adminConnected ? (
          <div className="flex justify-center h-screen">
            <div className="w-96">
              <div className="flex justify-center pt-2 lg:pt-10">
                <div className="relative opacity-100 w-80 h-80">
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
                <div className="p-1.5 lg:py-2 text-lg w-80 h-16">
                  {/* Hi I'm a stranger looking to talk, ttttt this is random default text */}
                  {sentText}
                </div>
              </div>
              <ChatInput />
              <ChatInputMobile />
            </div>
          </div>
        ) : (
          <div className="flex justify-center pt-64">
            <div className="grid grid-cols">
              <CustomSpinner className="flex justify-center" />
              <div className="flex justify-center px-4 pt-6">
                Connecting. This can take a minute
              </div>
            </div>
          </div>
        )}
      </div>
    </>
  )
}
