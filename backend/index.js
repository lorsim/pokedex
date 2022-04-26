const cookieSession = require('cookie-session')
const passportSetup = require('./passport')
const passport = require('passport')
const cors = require('cors')
const express = require('express')
const path = require('path')
const authRoute = require('./routes/auth')

require('dotenv').config()

const app = express()

app.use(cookieSession(
    {
        name: "session",
        keys: ["pokedex"],
        maxAge: 24 * 60 * 60 * 1000,
    }
))

app.use(passport.initialize())
app.use(passport.session())

app.use(cors({
    origin: "http://localhost:3000",
    methods: "GET,POST,PUT,DELETE",
    credentials: true,
}))

app.use("/auth", authRoute)

app.use('/uploads', express.static(path.join(__dirname, '/uploads')))

if (process.env.NODE_ENV === 'production') {
  app.use(express.static(path.join(__dirname, '/frontend/build')))

  app.get('*', (req, res) =>
    res.sendFile(path.join(__dirname, 'frontend', 'build', 'index.html'))
  )
} else {
  app.get('/', (req, res) => {
    res.send('API is running....')
  })
}

app.listen(process.env.PORT, () => {
    console.log('listening on')
})