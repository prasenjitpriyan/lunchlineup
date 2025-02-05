import type { Metadata } from 'next'
import './globals.css'

export const metadata: Metadata = {
  title: 'Lunch Lineup',
  description: 'Workday Eats: Daily Lunch Specials'
}

export default function RootLayout({
  children
}: Readonly<{
  children: React.ReactNode
}>) {
  return (
    <html lang="en">
      <body className="flex">
        <main className="flex-1">{children}</main>
      </body>
    </html>
  )
}
