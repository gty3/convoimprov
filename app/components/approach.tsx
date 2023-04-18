"use client"

import { useEffect, useState } from "react"
import Chat from "./chat"
import Image from "next/image"

export default function ApproachPage() {
  const [pageState, setPageState] = useState("approach")

  const initiateChat = async () => {
    setPageState("chat")
    const initRes = await fetch("/api/initChat")
    console.log("initRes,", initRes)
  }

  const ProceedButton = () => {
    return (
      <div
        onClick={() => initiateChat()}
        className="flex justify-center py-3 m-2 font-bold text-white rounded-lg cursor-pointer bg-slate-800"
      >
        Approach
      </div>
    )
  }

  const Loading = () => {
    return (
      <div className="flex justify-center">
        <div className="flex justify-center py-3 m-2 font-bold text-white rounded-lg">
          Loading...
        </div>
      </div>
    )
  }

  return (
    <div>
      <div className="flex justify-center ">
        <Image
          src=""
          width={340}
          height={340}
          alt="guy eating at cafe"
          className="border border-black"
        />
      </div>
      {pageState === "approach" && (
        <div className="">
          <div className="flex justify-center">
            <div className="max-w-3xl m-2 mt-4">
              {`Approach as many times as you'd like.`}
            </div>
          </div>
          <div className="flex justify-center">
            <div className="w-40">
              <ProceedButton />
            </div>
          </div>
        </div>
      )}
      {pageState === "loading" && <Loading />}
      {pageState === "chat" && <Chat username="client" />}
    </div>
  )
}
