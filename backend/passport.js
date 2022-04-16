const FacebookStrategy = require('passport-facebook').Strategy
const passport = require('passport')
require('dotenv').config()

passport.use(
    new FacebookStrategy({
        clientID: process.env.FACEBOOK_APP_ID,
        clientSecret: process.env.FACEBOOK_APP_SECRET,
        callbackURL: "/auth/facebook/callback",
    },
        function (accessToken, refreshToken, profile, done) {
        done(null, profile)
    }
    )
)

passport.serializeUser((user, done) => {
    done(null, user)
})

passport.deserializeUser((user, done) => {
    done(null, user)
})