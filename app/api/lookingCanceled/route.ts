import { SESClient, SendEmailCommand } from "@aws-sdk/client-ses"

export async function GET(request: Request) {

  console.log("NODE ENV:::", process.env.NODE_ENV)

  if (process.env.NODE_ENV !== "development") {
    try {
      await new SESClient({ region: "us-east-1" }).send(
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
                Data: "looking-for canceled",
              },
            },
          },
        })
      )
    } catch (err) {
      console.log("SES-ERR:::", err)
    }
  }

  return new Response(JSON.stringify({ statusCode: 200 }))
}
