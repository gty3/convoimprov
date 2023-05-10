import ChatComponent from "../../components/chatComponent"
import OpenTok from "opentok"

export default async function ChatPage({ params }: { params: { session: string } }) {
  const opentok = new OpenTok(
    process.env.NEXT_PUBLIC_OPENTOK_APIKEY,
    process.env.OPENTOK_SECRET
  )

  const sessionId = params.session

  const token = opentok.generateToken(sessionId)

  return (
    <>
      <div className="h-screen">
        <ChatComponent sessionId={sessionId} token={token} />
      </div>
    </>
  )
}
