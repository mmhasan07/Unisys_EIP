const nodemailer = require('nodemailer');

const emailTransporter = nodemailer.createTransport({
    service: "gmail",
    auth: {
        user: "saishwaranand132@gmail.com",
        // user: "eip.final.year.proj@gmail.com",
        pass: "infb sjva caek ewwx",
    },
});


module.exports = emailTransporter