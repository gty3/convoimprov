import './globals.css'

export const metadata = {
  title: 'Know what to say',
  description: 'Become a master communicator by talking with strangers',
}

export default function RootLayout({
  children,
}: {
  children: React.ReactNode
}) {
  return (
    <html lang="en">
      <body>{children}</body>
    </html>
  )
}
