import ChatComponent from "../components/chatComponent"
import { SESClient, SendEmailCommand } from "@aws-sdk/client-ses"
import OpenTok from "opentok"

export default async function ChatPage() {
  const opentok = new OpenTok(
    process.env.NEXT_PUBLIC_OPENTOK_APIKEY,
    process.env.OPENTOK_SECRET
  )
  console.log("NODE ENV:::", process.env.NODE_ENV)

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
  const sessionId = session.sessionId
  if (process.env.NODE_ENV !== "development") {
    try {
      await new SESClient({ region: "us-east-1" }).send(
        new SendEmailCommand({
          Source: "gefyoung@gmail.com",
          Destination: {
            ToAddresses: ["gefyoung@gmail.com"]
          },
          Message: {
            Subject: {
              Data: "convoImprov Call"
            },
            Body: {
              Text: {
                Data: "https://convoimprov.vercel.app/admin/" + sessionId
              }
            }
          }
        })
      )
    } catch (err) {
      console.log('SES-ERR:::', err)
    }
  }

  const token = opentok.generateToken(sessionId)

  return (
    <>
      <div className="h-screen">
        <ChatComponent sessionId={sessionId} token={token} />
      </div>
    </>
  )
}
