import { NextResponse } from "next/server"
import * as Pusher from "pusher"


const pusher = new Pusher.default({
  appId: process.env.PUSHER_APP_ID??"",
  key: process.env.NEXT_PUBLIC_PUSHER_KEY??"",
  secret: process.env.PUSHER_SECRET??"",
  cluster: process.env.NEXT_PUBLIC_PUSHER_CLUSTER??""
})

export async function POST(request: Request) {
  console.log("admin Hit, evtbody,")
  if (!request.body) {
    return NextResponse.json({ error: "no body" })
  }


  try {
    const body = await request.json()

    const { username, channel } = body


    pusher
    .trigger("channel1", "adminConnected", { username: username })
    .catch((error: any) => console.log("error", error))
    console.log('pusher hit in admin?????')
    return NextResponse.json({ body: "message sent" })
  } catch (err) {
    console.log(err)
    return NextResponse.json({ body: "error" })
  }
}
