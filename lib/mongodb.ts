import mongoose, { Mongoose } from 'mongoose'

const MONGODB_URI: string = process.env.MONGODB_URI as string
if (!MONGODB_URI) {
  throw new Error('Please define the MONGODB_URI environment variable')
}

interface MongooseCache {
  conn: Mongoose | null
  promise: Promise<Mongoose> | null
}

// Use const since cached is not reassigned
const globalWithMongoose = global as typeof global & {
  mongoose?: MongooseCache
}
const cached: MongooseCache = globalWithMongoose.mongoose || {
  conn: null,
  promise: null
}

export async function connectToDatabase() {
  if (cached.conn) {
    return cached.conn
  }
  if (!cached.promise) {
    cached.promise = mongoose
      .connect(MONGODB_URI, {
        dbName: 'Lunch_Lineup',
        bufferCommands: false
      })
      .then((mongoose) => mongoose)
  }
  cached.conn = await cached.promise
  globalWithMongoose.mongoose = cached
  return cached.conn
}
