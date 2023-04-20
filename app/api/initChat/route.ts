import { SES } from "aws-sdk"
import { NextResponse } from "next/server"
import OpenTok from "opentok"

const ses = new SES()
const opentok = new OpenTok(
  "46811014",
  "a08e3091383c15b49286a7710fc37458b67fc869"
)

export async function GET() {
  // if (!process.env.STAGE) {
  //   console.log("no stage ENV")
  //   return NextResponse.json({ body: "no stage env" })
  // }
  console.log("initChat Hit, evtbody")

  function createSession(): Promise<OpenTok.Session> {
    return new Promise(function (resolve, reject) {
      opentok.createSession({ mediaMode: "relayed" }, (err, session) => {
        if (session) {
          return resolve(session)
        } else {
          return reject(err)
        }
      })
    })
  }
  const session = await createSession()
  const userToken = opentok.generateToken(session.sessionId)
  const adminToken = opentok.generateToken(session.sessionId)
  console.log("adminToken", adminToken)

  // const emailParams = {
  //   Destination: {
  //     ToAddresses: ["gefyoung@gmail.com"],
  //   },
  //   Message: {
  //     Body: {
  //       Text: { Data: `open phone learnwhattosay.com/admin` },
  //     },
  //     Subject: { Data: "learnwhattosay chat activation" },
  //   },
  //   Source: "learnWhatToSay <noreply@learnwhattosay.com>",
  // }
  // try {
  //   if (process.env.STAGE === "prod") {
  //     const sendEmail = ses.sendEmail(emailParams).promise()
  //     await sendEmail
  //   }
  // } catch (err) {
  //   console.log("email Error:::::", err)
  //   return NextResponse.json({ body: "error sending email" })
  // }
  return NextResponse.json({
    sessionId: session.sessionId,
    token: userToken,
    apiKey: "46811014",
  })
}
