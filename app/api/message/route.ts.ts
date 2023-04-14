import { NextApiRequest, NextApiResponse } from "next"

var Pusher = require("pusher")

export default function handler(req: NextApiRequest, res: NextApiResponse) {
  console.log("Message Hit, evtbody,")
  if (!req.body) {
    res.status(500).json({ error: "no body" })
  }

  try {
    const { username, channel, message } = JSON.parse(req.body)

    var pusher = new Pusher({
      appId: process.env.PUSHER_APP_ID,
      key: process.env.PUSHER_KEY,
      secret: process.env.PUSHER_SECRET,
      cluster: process.env.PUSHER_CLUSTER,
    })

    pusher
      .trigger("channel1", "message", { message: message, username: username })
      .catch((error: any) => console.log("error", error))

    return {
      body: "message sent",
    }
  } catch (err) {
    console.log(err)
    return {
      body: "error",
    }
  }
}
