
module.exports = class Logout {
    async logout(req, res) {
        req.session.destroy(function (err) { })
        res.status(200).json({ 'message': 'sessão finalizada' })
        // res.redirect('/')
    }
}
