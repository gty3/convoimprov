import { SES } from "aws-sdk"
import { NextResponse } from "next/server"
const ses = new SES()

export async function GET(request: Request) {
  if (!process.env.STAGE) {
    console.log("no stage ENV")
    return NextResponse.json({ body: "no stage env" })
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
    return NextResponse.json({ body: "error sending email" })
  }
  return NextResponse.json(`success+ ${process.env.STAGE}`)
}
