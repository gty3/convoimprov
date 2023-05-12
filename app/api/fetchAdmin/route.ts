import { SESClient, SendEmailCommand } from "@aws-sdk/client-ses"
import OpenTok from "opentok"

export async function GET(request: Request) {
  const opentok = new OpenTok(
    process.env.NEXT_PUBLIC_OPENTOK_APIKEY,
    process.env.OPENTOK_SECRET
  )

  let sessionId: string
  let emailRes: any

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

  try {
    const session = await createSession()
    sessionId = session.sessionId
  } catch (err) {
    sessionId = JSON.stringify(err)
  }

  if (process.env.NODE_ENV !== "development") {
    try {
      emailRes = await new SESClient({ region: "us-east-1" }).send(
        new SendEmailCommand({
          Source: "gefyoung@gmail.com",
          Destination: {
            ToAddresses: ["gefyoung@gmail.com"],
          },
          Message: {
            Subject: {
              Data: "convoImprov Call",
            },
            Body: {
              Text: {
                Data: "https://convoimprov.vercel.app/admin/" + sessionId,
              },
            },
          },
        })
      )
    } catch (err) {
      console.log("SES-ERR:::", err)
    }
  }
  const token = opentok.generateToken(sessionId)

  return new Response(
    JSON.stringify({ sessionId: sessionId, token: token })
  )
}
