import mongoose, { ConnectOptions } from 'mongoose'
import config from '../config'

export default () => {
  console.log('URL ', config.dbURL)
  mongoose.connect(`${config.dbURL}`, {
    useNewUrlParser: true,
  } as ConnectOptions)
  console.log('Db Connected')

  mongoose.connection.on('error', (e) => {
    console.error(`Error ${e}`)
  })
}
