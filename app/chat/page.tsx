import ChatComponent from "../components/chatComponent"
import { SES } from "aws-sdk"
import OpenTok from "opentok"

export default async function ChatPage() {
  const ses = new SES()
  const opentok = new OpenTok(
    process.env.NEXT_PUBLIC_OPENTOK_APIKEY,
    process.env.OPENTOK_SECRET
  )

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
  const token = opentok.generateToken(sessionId)

  return (
    <>
      <div className="h-screen">
        <ChatComponent sessionId={sessionId} token={token} />
      </div>
    </>
  )
}
