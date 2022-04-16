const cookieSession = require('cookie-session')
const passportSetup = require('./passport')
const passport = require('passport')
const cors = require('cors')
const express = require('express')
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

app.listen(process.env.PORT, () => {
    console.log('listening on')
})