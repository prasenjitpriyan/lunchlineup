import type { Metadata } from 'next'
import './globals.css'
import AuthProvider from '@/components/AuthProvider'

export const metadata: Metadata = {
  title: 'Lunch Lineup',
  description: 'Workday Eats: Daily Lunch Specials',
  keywords: 'Office Lunch',
  authors: [{ name: 'Prasenjit Das' }]
}

export default function RootLayout({
  children
}: Readonly<{
  children: React.ReactNode
}>) {
  return (
    <html lang="en">
      <body className="flex">
        <main className="flex-1">
          <AuthProvider>{children}</AuthProvider>
        </main>
      </body>
    </html>
  )
}
