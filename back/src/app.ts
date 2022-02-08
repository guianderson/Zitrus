import * as express from 'express'
import * as fileUpload from "express-fileupload";
import routes from './routes'
import * as cors from 'cors'

const app = express()
app.use(cors())
app.use(express.json())
app.use(fileUpload())
app.use(routes)

export default app;