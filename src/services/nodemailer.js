const nodemailer = require("nodemailer");

class Mailer {

    async main(req, res) {

        let transporter = nodemailer.createTransport({
            host: "smtp.ethereal.email",
            port: 587,
            secure: false,
            auth: {
                user: process.env.ETHEREAL_MAIL,
                pass: process.env.ETHEREAL_PASS,
            },
        });

        let info = await transporter.sendMail({
            from: 'MainMenu seu cardápio digital 👻" <mainmenu@example.com>',
            to: "josephine.moen35@ethereal.email",
            subject: "Hello ✔ First Test",
            text: "Hello world?",
            html: "<b>Hello world?</b>",
        });

        console.log("Message sent: %s", info.messageId);
        console.log("Preview URL: %s", nodemailer.getTestMessageUrl(info));
    }
}

module.exports = new Mailer()

