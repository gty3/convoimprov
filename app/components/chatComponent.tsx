"use client"

import { SyntheticEvent, useEffect, useRef, useState } from "react"
import OT, { Session } from "@opentok/client"
import Image from "next/image"
import { debounce } from "debounce"

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

  const messageRef = useRef<HTMLTextAreaElement>(null)

  const ChatInput = () => {
    return (
      <form className="flex justify-center mt-20">
        <textarea
          autoFocus
          rows={4}
          className="px-1 border border-black w-80"
          onChange={(e) => handleTextChange(e)}
          ref={messageRef}
        />
      </form>
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
        {adminConnected ? (
          <div className="flex justify-center h-screen">
            <div className="w-96">
              <div className="flex justify-center pt-10">
                <Image
                  src=""
                  width={340}
                  height={340}
                  alt="guy eating at cafe"
                  className="flex items-center justify-center border border-black"
                />
              </div>
              <div className="grid grid-cols-2 grid-rows-2 row-start-2">
                <div className="col-start-2 row-start-2 m-1 mr-3 bg-gray-100 border border-blue-700 ">
                  {sentText}
                </div>
                <div className="grid m-1 ml-3 border border-black marker:col-span-1">
                  {receivedText}
                </div>
              </div>
              <ChatInput />
            </div>
          </div>
        ) : (
          <div>loading</div>
        )}
      </div>
    </>
  )
}
