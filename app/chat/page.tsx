"use client"

import Head from "next/head"
import { SyntheticEvent, useEffect, useRef, useState } from "react"
import Pusher from "pusher-js"
// import Image from "next/image"
import debounce from "debounce"
import Chat from "../components/chatComponent"

export default function ChatPage() {

  return (
    <Chat username="client" />
  )
}
