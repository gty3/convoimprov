import { NextResponse } from "next/server"

var Pusher = require("pusher")

export async function POST(request: Request) {
  console.log("Message Hit, evtbody,")
  if (!request.body) {
    return NextResponse.json({ error: "no body" })
  }

  try {
    const body = await request.json()

    const { username, channel, message } = body

    var pusher = new Pusher({
      appId: process.env.PUSHER_APP_ID,
      key: process.env.NEXT_PUBLIC_PUSHER_KEY,
      secret: process.env.PUSHER_SECRET,
      cluster: process.env.NEXT_PUBLIC_PUSHER_CLUSTER,
    })

    pusher
      .trigger("channel1", "message", { message: message, username: username })
      .catch((error: any) => console.log("error", error))
    return NextResponse.json({ body: "message sent" })
  } catch (err) {
    console.log(err)
    return NextResponse.json({ body: "error" })
  }
}
