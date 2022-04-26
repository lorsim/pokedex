const router = require('express').Router()
const passport = require('passport')

router.get("/login/success", (req, res) => {
    if (req.user) {
        res.status(200).json({ 
            success: true,
            message: "successful",
            user: req.user
        })
    }
})

router.get("/login/failed", (req, res) => {
    res.status(401).json({
        success: false,
        message: "failed",
    })
})

router.get("/logout", (req, res) => {
    req.logout();
    res.redirect(process.env.CLIENT_URL)
})

router.get("/facebook", passport.authenticate("facebook", { scope: ["profile"] }))

router.get(
    "/facebook/callback",
    passport.authenticate("facebook", {
        successRedirect: process.env.CLIENT_URL,
        failureRedirect: "/login/failed",
    })
)

module.exports = router
