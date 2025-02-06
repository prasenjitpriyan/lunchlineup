import { NextAuthOptions } from 'next-auth'
import CredentialsProvider from 'next-auth/providers/credentials'
import bcrypt from 'bcryptjs'
import UserModel from '@/models/User'
import { connectToDatabase } from '@/lib/mongodb'

export const authOptions: NextAuthOptions = {
  //Providers
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
            role: user.role
          }
        } catch (error) {
          throw error
        }
      }
    })
  ],
  //Callbacks
  callbacks: {
    async jwt({ token, user }) {
      if (user) {
        token.id = user.id
      }
      return token
    },
    async session({ session, token }) {
      if (session.user) {
        session.user.id = token.id as string
      }
      return session
    }
  },
  //Pages
  pages: {
    signIn: '/login',
    error: '/login'
  },
  //Session
  session: {
    strategy: 'jwt',
    maxAge: 30 * 24 * 60 * 60
  },
  secret: process.env.NEXTAUTH_SECRET
}
