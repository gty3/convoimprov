import OpenTok from "opentok"
import Client from "./client"

export default function AdminPage({ params }: { params: { session: string } }) {
  const opentok = new OpenTok(
    process.env.NEXT_PUBLIC_OPENTOK_APIKEY,
    process.env.OPENTOK_SECRET
  )
  const token = opentok.generateToken(params.session)

  return (
    <div className="h-screen">
      <Client sessionId={params.session} token={token} />
    </div>
  )
  // return userState ? <Chat username="admin" /> : <div className="h-screen">user disconnected</div>
}
