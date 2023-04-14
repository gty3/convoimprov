import { SES } from "aws-sdk"
import { NextApiRequest, NextApiResponse } from "next"

const ses = new SES()

export default async function handler(
  req: NextApiRequest,
  res: NextApiResponse
) {
  if (!process.env.STAGE) {
    console.log("no stage ENV")
    res.status(500).json({ body: "no stage env" })
  }
  console.log("initChat Hit, evtbody")

  const emailParams = {
    Destination: {
      ToAddresses: ["gefyoung@gmail.com"],
    },
    Message: {
      Body: {
        Text: { Data: `open phone learnwhattosay.com/admin` },
      },
      Subject: { Data: "learnwhattosay chat activation" },
    },
    Source: "learnWhatToSay <noreply@learnwhattosay.com>",
  }
  try {
    if (process.env.STAGE === "prod") {
      const sendEmail = ses.sendEmail(emailParams).promise()
      await sendEmail
    }
  } catch (err) {
    console.log("email Error:::::", err)
    res.status(500).json({ body: "email error" })
  }
  res.status(200).json({ body: `success+ ${process.env.STAGE}` })

  //return chatroom details
}

