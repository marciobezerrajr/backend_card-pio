const localStrategy = require('passport-local').Strategy
const bcrypt = require('bcryptjs')
const User = require('../models/User')

module.exports = function (passport) {
    passport.use(new localStrategy((email, password, done) => {
        User.findOne({ email }).then((user) => {
            if (!user) {
                return done(null, false, { message: "Esta conta não existe" })
            }

            bcrypt.compare(password, user.password, (err, ok) => {
                if (ok) {
                    return done(null, user)

                } else {
                    return done(null, false, { message: "E-mail ou senha incorreta" })
                }
            })
        })
    }))

    passport.serializeUser((user, done) => {
        done(null, user.id)
    })

    passport.deserializeUser((id, done) => {
        User.findById(id, (err, user) => {
            done(err, user)
        })
    })

}