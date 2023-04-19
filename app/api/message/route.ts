import { NextResponse } from "next/server"
import * as Pusher from "pusher"

const pusher = new Pusher.default({
  appId: process.env.PUSHER_APP_ID ?? "",
  key: process.env.NEXT_PUBLIC_PUSHER_KEY ?? "",
  secret: process.env.PUSHER_SECRET ?? "",
  cluster: process.env.NEXT_PUBLIC_PUSHER_CLUSTER ?? "",
})

export async function POST(request: Request) {
  console.log("Message Hit, evtbody,")
  if (!request.body) {
    return NextResponse.json({ error: "no body" })
  }

  try {
    const body = await request.json()

    const { username, channel, message } = body

    // pusher.terminateUserConnections("client")
    // pusher.terminateUserConnections("admin")
    pusher
      .trigger("channel1", "message", { message: message, username: username })
      .then(() => console.log('in pusher THEN', message))
      .catch((error: any) => console.log("error", error))
    console.log('after pusher then/catch pusher hit in message?????', message)
    return NextResponse.json({ body: "message sent" })
  } catch (err) {
    console.log(err)
    return NextResponse.json({ body: "error" })
  }
}
