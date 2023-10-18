import dotenv from 'dotenv'
if (process.env.NODE_ENV !== 'production') {
  dotenv.config()
}

export default {
  dbURL: process.env.MONGODB_URL,
  accessTokenKey: process.env.ACCESSTOKENKEY,
}
