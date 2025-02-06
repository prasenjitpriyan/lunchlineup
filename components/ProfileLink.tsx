import Link from 'next/link'
import { useSession } from 'next-auth/react'

export default function Navbar() {
  const { data: session } = useSession()

  return (
    <nav>
      {session && (
        <Link href="/profile">
          <img
            src={session.user.image || '/my.webp'}
            alt="Profile"
            className="w-10 h-10 rounded-full"
          />
        </Link>
      )}
    </nav>
  )
}
