const login = require('../services/auth/Login')
const logout = require('../services/auth/Logout')
const forgotPassword = require('../services/auth/ForgotPassword')
const changePassword = require('../services/auth/ChangePassword')

module.exports = new class authController {

    async login(req, res) {
        const user = new login()
        await user.login(req, res)
    }

    async logout(req, res) {
        const user = new logout()
        await user.logout(req, res)
    }

    async changePassword(req, res) {
        const user = new changePassword()
        await user.changePassword(req, res)
    }

    async forgotPassword(req, res) {
        const user = new forgotPassword()
        await user.forgotPassword(req, res)

    }
}
