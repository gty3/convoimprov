"use client"

import Chat from "../components/chat"
import Image from "next/image"

export default function Admin() {
  return (
    <div className="">
      <div className="">
        <div className="flex justify-center mt-10 mb-10 text-3xl">Admin</div>
        <div className="flex justify-center">
          <Image
            className="flex justify-center border border-black"
            src=""
            width={340}
            height={340}
            alt="guy eating at cafe"
          />
        </div>
        <Chat username="admin"/>
      </div>
    </div>
  )
}
