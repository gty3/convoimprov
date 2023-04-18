"use client"

import Head from "next/head"
import { SyntheticEvent, useEffect, useRef, useState } from "react"
import Pusher from "pusher-js"
// import Image from "next/image"
import debounce from "debounce"
import Image from "next/image"

export default function ChatComponent({ username }: { username: string }) {
  const [senderMessage, setSenderMessage] = useState("")
  const [receiverMessage, setReceiverMessage] = useState("")
  // const [isTyping, setIsTyping] = useState(false)
  // const [messageTyped, setMessageTyped] = useState(false)

  const messageRef = useRef<HTMLTextAreaElement>(null)

  const channel = "channel1"

  const ChatInput = () => {
    return (
      <form
        className="flex justify-center mt-20"
        // onSubmit={(e) => sendMessage(e)}
      >
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
    setSenderMessage(messageRef.current.value)
    try {
      await fetch("/api/message", {
        method: "POST",
        body: JSON.stringify({
          message: messageRef.current.value,
          username: username,
          channel: channel,
        }),
      })
    } catch (err) {
      console.log(err)
      console.log("shit errored")
    }
  }, 700)

  const handleTextChange = async (e: SyntheticEvent) => {
    messageDebounced()
  }

  useEffect(() => {
    const pusher = new Pusher(process.env.NEXT_PUBLIC_PUSHER_KEY ?? "", {
      cluster: process.env.NEXT_PUBLIC_PUSHER_CLUSTER ?? "",
    })

    const pusherChannel = pusher.subscribe(channel)

    pusherChannel.bind("message", (data: any) => {
      console.log("data::::::", data)
      if (data.username !== username) {
        setReceiverMessage(data.message)
      }
    })

    // pusherChannel.bind("user_typing", function (data: any) {
    //   if (data.username !== username) {
    //     var typingText = data.username + " is typing..."
    //     setTyping(typingText)
    //     clearTimeout(clearTimerId1)
    //     clearTimerId1 = setTimeout(function () {
    //       setTyping("")
    //     }, clearInterval1)
    //   }
    // })

    return () => {
      pusher.unsubscribe(channel)
    }
  }, [username])

  return (
    <>
      <Head>
        <script src="https://js.pusher.com/7.2/pusher.min.js" async></script>
      </Head>
      <div className="justify-center h-screen">
        <div className="flex justify-center pt-10">
        <Image
          src=""
          width={340}
          height={340}
          alt="guy eating at cafe"
          className="flex items-center justify-center border border-black"
        />
        </div>

        <div className="m-1 bg-gray-100">{senderMessage}</div>
        <div className="m-1">{receiverMessage}</div>
        <ChatInput />
      </div>
    </>
  )
}
