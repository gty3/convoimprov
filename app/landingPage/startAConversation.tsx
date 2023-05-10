"use client"

import Link from "next/link"
import Image from "next/image"
import { useSpring, animated } from "@react-spring/web"
import { useState } from "react"
import { useRouter } from "next/navigation"

export default function StartAConversation() {
  const [lookingState, setLookingState] = useState(false)

  const notificationSpring = useSpring({
    from: { opacity: 0, height: 0 },
    to: { opacity: 1 },
    // config: { duration: 2000 },
    duration: 2000
  })
  const loadingSpring = useSpring({
    from: { width: 0 },
    to: { width: 100}
  })

  const router = useRouter()

  const startClicked = async () => {
    // e.preventDefault()
    setLookingState(true)
    const fetchAdmin = await fetch("/api/fetchAdmin")
    const res = await fetchAdmin.json()
    const { sessionId } = res
    setTimeout(() => {
      router.push(`/chat/${sessionId}`)
    }, 5000)
  }

  return (
    <>
      <div className="flex justify-center">
        <div className="mt-10 h-80 w-[36rem]">
          <div className="p-2 mb-4 text-3xl font-bold text-center">
            Start a conversation:
          </div>
          <div className="flex justify-center">
            <div className="w-40 p-4 text-center bg-gray-100 border cursor-pointer sm:w-40 sm:mt-6 rounded-xl drop-shadow-xl">
              <div onClick={() => startClicked()}>
                <div>
                  Random
                  <div className="">
                    <Image
                      src="/blank_person.png"
                      width={340}
                      height={340}
                      alt="Blank Person"
                      className="border border-black"
                    />
                  </div>
                  <div className="pt-3 text-lg font-bold">Text</div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
      {lookingState && (
        <>
          <animated.div
            style={notificationSpring}
            className="sticky flex justify-center pb-10 mt-2 bg-gray-200 bottom-4"
          >
            <div>Looking for someone to chat with</div>
          </animated.div>
          <animated.div style={loadingSpring}>

          </animated.div>
        </>
      )}
    </>
  )
}
