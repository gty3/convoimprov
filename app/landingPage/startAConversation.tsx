"use client"

import Image from "next/image"
import { useEffect, useRef, useState } from "react"
import { useRouter } from "next/navigation"
import { AnimatePresence, motion } from "framer-motion"
import LoadingBalls from "./startAConversation/loadingBalls"

export default function StartAConversation() {
  const [lookingState, setLookingState] = useState<string | null>(null)

  const timerRef = useRef<any>()

  const router = useRouter()



  const startClicked = async () => {
    setLookingState("looking")
    try {
      const fetchAdmin = await fetch("/api/fetchAdmin", {
        method: "POST",
      })
      const res = await fetchAdmin.json()
      const { sessionId, token } = res
      console.log("res:", res)

      const OT = (await import("@opentok/client")).default
      const otSession = OT.initSession(
        process.env.NEXT_PUBLIC_OPENTOK_APIKEY,
        sessionId
      )

      otSession.connect(token, function (err) {
        if (err) {
          console.log("session-connect-error:::", err)
        }
      })

      otSession.on("connectionCreated", (event) => {
        const eventConnectionId = event.connection.connectionId
        const thisConnectionId = otSession.connection?.connectionId
        if (eventConnectionId !== thisConnectionId) {
          router.push(`/chat/${sessionId}`)
        }
      })
      timerRef.current = setTimeout(() => {
        setLookingState("nobody")
      }, 10000)
    } catch (err) {
      console.log("err:", err)
    }
  }

  const closeLooking = async (closedWhenNobody: Boolean) => {
    // clearTimeout(timerRef.current)
    setLookingState(null)
    const lookingCanceled = await fetch("/api/lookingCanceled", {
      method: "POST",
      body: closedWhenNobody ? "Closed after 'no one is available'" : "",
    })
    clearTimeout(timerRef.current)
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
        {lookingState === "looking" ? (
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
                  onClick={() => closeLooking(false)}
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
        ) : lookingState === "nobody" ? (
          <>
            <motion.div
              initial={{ opacity: 0, y: 40 }}
              animate={{ opacity: 1, y: 20 }}
              transition={{ duration: 0.2 }}
              className="sticky pb-3 mx-2 mt-2 bg-gray-200 rounded-md bottom-4"
              exit={{ opacity: 0, y: 40 }}
            >
              <div className="flex justify-center py-2">
                <div className="px-1 mt-1 mr-4 font-bold">There is currently no one available</div>
                <motion.div
                  whileHover={{ scale: 1.1 }}
                  whileTap={{ scale: 0.9 }}
                  className="w-8 h-8 pt-1 text-center bg-gray-300 rounded-full cursor-pointer hover:bg-gray-400"
                  onClick={() => closeLooking(true)}
                >
                  X
                </motion.div>
              </div>
              <div className="flex flex-col">
                <span className="mt-2 text-center ">
                  Want to recieve requests for conversation? Message me <a className="ml-0.5 text-blue-600" href="reddit.com/user/gty_">reddit.com/user/gty_</a>
                </span>
              </div>
            </motion.div>
          </>
        ) : null}
      </AnimatePresence>
    </>
  )
}
