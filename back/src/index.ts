import app from "./app"
import 'reflect-metadata'
import './database'

require('dotenv').config();

app.listen(5000, '0.0.0.0', () => {
    console.log('Server running')
})