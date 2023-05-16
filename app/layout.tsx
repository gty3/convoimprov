import "./globals.css"
import { Analytics } from "@vercel/analytics/react"

export const metadata = {
  title: "Talk with someone",
  description: "Become a master communicator by talking with strangers",
}

export default function RootLayout({
  children,
}: {
  children: React.ReactNode
}) {
  return (
    <html lang="en">
      <body>{children}</body>
      <Analytics />
    </html>
  )
}
