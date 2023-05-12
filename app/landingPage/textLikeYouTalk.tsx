"use client"

import { useState } from "react"

export default function TextLikeYouTalk() {
  const [index, setIndex] = useState(0)

  const convo = [
    "I'm trying to meet someone for a project and they won't text me back",
    "Should I tell them its bothering me?",
    "What do you think about - 'I know your busy but can you take like a second to reply?'",
  ]
  const response = [
    `Definitely, but I'd rephrase it`,
    `try - 'Hey I haven't received a response and I'm concerned we won't meet our deadline,
     are you available today?'`,
  ]


  return (
    <div className="grid h-40 grid-cols-2 mt-6 sm:w-[40rem]">
      <div>
        <div className="mt-4 text-2xl font-semibold">Text like you talk</div>
      </div>
      <div className="mt-5">
        <div
          className="flex items-center justify-center px-2.5 py-1.5 bg-gray-300 rounded-xl"
        >
          {convo}
        </div>
      </div>
    </div>
  )
}
