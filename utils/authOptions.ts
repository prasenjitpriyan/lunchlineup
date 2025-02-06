import { NextAuthOptions } from 'next-auth'
import CredentialsProvider from 'next-auth/providers/credentials'
import bcrypt from 'bcryptjs'
import UserModel from '@/models/User'
import { connectToDatabase } from '@/lib/mongodb'

export const authOptions: NextAuthOptions = {
  providers: [
    CredentialsProvider({
      name: 'Credentials',
      credentials: {
        email: { label: 'Email', type: 'text' },
        password: { label: 'Password', type: 'password' }
      },
      async authorize(credentials) {
        if (!credentials?.email || !credentials?.password) {
          throw new Error('Email and password are required')
        }
        try {
          await connectToDatabase()
          const user = await UserModel.findOne({ email: credentials.email })
          if (!user) {
            throw new Error('No user found')
          }
          const isValid = await bcrypt.compare(
            credentials.password,
            user.password
          )
          if (!isValid) {
            throw new Error('Invalid Password')
          }

          return {
            id: user._id.toString(),
            name: user.name,
            email: user.email,
            role: user.role || 'employee' // Ensure role is always a string
          }
        } catch (error) {
          throw error
        }
      }
    })
  ],
  callbacks: {
    async jwt({ token, user }) {
      if (user) {
        token.id = user.id
        token.email = user.email ?? '' // Ensure token.email is always a string
        token.role = user.role || 'employee' // Default role if undefined
      }
      return token
    },
    async session({ session, token }) {
      session.user = {
        ...session.user,
        role: token.role || 'employee' // Default role if undefined
      }
      return session
    }
  },
  pages: {
    signIn: '/login',
    error: '/login',
    signOut: '/'
  },
  session: {
    strategy: 'jwt',
    maxAge: 30 * 24 * 60 * 60
  },
  secret: process.env.NEXTAUTH_SECRET
}
