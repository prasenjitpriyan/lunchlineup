import NextAuth, {
  NextAuthOptions,
  Session,
  User as NextAuthUser
} from 'next-auth'
import CredentialsProvider from 'next-auth/providers/credentials'
import { client } from '@/sanity/lib/client'
import { JWT } from 'next-auth/jwt'
import { User } from '@/types/Users'

declare module 'next-auth' {
  interface Session {
    user: User
  }
}

// Type guard to check if a user has the 'role' property
const isCustomUser = (user: NextAuthUser | User): user is User => {
  return (user as User).role !== undefined
}

export const authOptions: NextAuthOptions = {
  providers: [
    CredentialsProvider({
      name: 'Credentials',
      credentials: {
        email: { label: 'Email', type: 'email' },
        password: { label: 'Password', type: 'password' }
      },
      async authorize(credentials): Promise<User | null> {
        if (!credentials?.email || !credentials?.password) return null

        const query = `*[_type == "user" && email == $email][0]`
        const user = await client.fetch(query, { email: credentials.email })

        if (!user || user.password !== credentials.password) return null

        return {
          id: user._id,
          name: user.name,
          email: user.email,
          role: user.role
        }
      }
    })
  ],
  callbacks: {
    async jwt({
      token,
      user
    }: {
      token: JWT
      user?: NextAuthUser | User
      account?: unknown
    }) {
      if (user && isCustomUser(user)) {
        token.role = user.role
      }
      return token
    },
    async session({ session, token }: { session: Session; token: JWT }) {
      if (session.user) {
        session.user.role = token.role as string
      }
      return session
    },
    async redirect({ url, baseUrl }: { url: string; baseUrl: string }) {
      return url.startsWith(baseUrl) ? url : baseUrl
    }
  },
  secret: process.env.NEXTAUTH_SECRET,
  pages: {
    signIn: '/login'
  }
}

const handler = NextAuth(authOptions)
export { handler as GET, handler as POST }
