"use client"

import Image from "next/image"
import { useEffect, useRef, useState } from "react"
import { useRouter } from "next/navigation"
import { AnimatePresence, motion } from "framer-motion"
import LoadingBalls from "./startAConversation/loadingBalls"

export default function StartAConversation() {
  const [lookingState, setLookingState] = useState(false)

  const timerRef = useRef<any>()

  const router = useRouter()

  timerRef.current = (session: string) => {
    setTimeout(() => {
      console.log(session)
      // router.push(`/chat/${session}`)
    }, 1000)
  }

  const startClicked = async () => {
    setLookingState(true)
    try {
      const fetchAdmin = await fetch("/api/fetchAdmin", {
        next: { revalidate: 0 },
      })
      const res = await fetchAdmin.json()
      const { sessionId, token } = res
      console.log("res:", res)

      const OT = (await import("@opentok/client")).default
      const otSession = OT.initSession(
        process.env.NEXT_PUBLIC_OPENTOK_APIKEY,
        sessionId
      )
      // console.log("otSession::", otSession)
      otSession.connect(token, function (err) {
        if (err) {
          console.log("session-connect-error:::", err)
        }
      })
      otSession.on("connectionCreated", (event) => {
        // console.log("CONNECTION!!!@@@@@@@")
        // router.push(`/chat/${sessionId}`)
        const eventConnectionId = event.connection.connectionId
        const thisConnectionId = otSession.connection?.connectionId
        if (eventConnectionId !== thisConnectionId) {
          router.push(`/chat/${sessionId}`)
        }
      })

      // timerRef.current(sessionId)
    } catch (err) {
      console.log("err:", err)
    }
  }
  const closeLooking = async () => {
    // clearTimeout(timerRef.current)
    setLookingState(false)
    const lookingCanceled = await fetch("/api/lookingCanceled")
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
      <AnimatePresence>
        {lookingState && (
          <>
            <motion.div
              initial={{ opacity: 0, y: 40 }}
              animate={{ opacity: 1, y: 20 }}
              transition={{ duration: 0.2 }}
              className="sticky pb-3 mx-2 mt-2 bg-gray-200 rounded-md bottom-4"
              exit={{ opacity: 0, y: 40 }}
            >
              <div className="flex justify-center py-2">
                <div className="px-1 mt-1 mr-4">
                  Looking for someone to chat with
                </div>
                <motion.div
                  whileHover={{ scale: 1.1 }}
                  whileTap={{ scale: 0.9 }}
                  className="w-8 h-8 pt-1 text-center bg-gray-300 rounded-full cursor-pointer hover:bg-gray-400"
                  onClick={() => closeLooking()}
                >
                  X
                </motion.div>
              </div>
              <div className="flex flex-col">
                <div className="flex justify-center mt-2">
                  <LoadingBalls />
                </div>
              </div>
            </motion.div>
          </>
        )}
      </AnimatePresence>
    </>
  )
}
