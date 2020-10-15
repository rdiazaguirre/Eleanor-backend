var nodemailer = require("nodemailer");
exports.sendNewUserEmail = async(name, email, code) => {
    const to = [{ name: name, email: email }];
    const from = [{ name: process.env.USER_MAIL_NAME, email: process.env.USER_MAIL_EMAIL }];
    const subject = process.env.EMAIL_SUBJECT_NEW_USER;
    const body = await this.templateNewUserEmail(code);
    await this.sendEmail(to, from, subject, body);
}
exports.sendResetPasswordEmail = async(options) => {
    const to = [{ name: options.name, email: options.email }];
    const from = [{ name: process.env.USER_MAIL_NAME, email: process.env.USER_MAIL_EMAIL }];
    const subject = process.env.EMAIL_SUBJECT_RESET_PASSWORD;
    const body = await this.templateResetPasswordEmail(options.code);
    await this.sendEmail(to, from, subject, body);
}
exports.templateNewUserEmail = async(options) => {
    return `<b>Hola, Soy Eleanor</b>
    <br/>
    <p>
    Ha sido creada una cuenta para usted.
    <br/>
    A continuación le indico su código de activación. Sólo tiene hasta el ${options.date} para utilizarlo.
    <br/>
    <ul>
        <li><strong>Código: ${options._id}</strong></li>
        <li><strong>Válido hasta: ${options.date}</strong></li>
    </ul>
    <br/>
    Debe establecer su contraseña <a href="${process.env.RESET_PASSWORD_URI}"><strong>aquí</strong></a>.
    </p>`
}
exports.templateResetPasswordEmail = async(options) => {
    return `<b>Hola, Soy Eleanor</b>
    <br/>
    <p>
    Recibí su solicitud de restablecimiento de contraseña.
    <br/>
    A continuación le indico su código de activación. Sólo tiene hasta el ${options.date} para utilizarlo.
    <br/>
    <ul>
        <li><strong>Código: ${options.code}</strong></li>
        <li><strong>Válido hasta: ${options.date}</strong></li>
    </ul>
    <br/>
    Restablezca su contraseña <a href="${process.env.RESET_PASSWORD_URI}"><strong>aquí</strong></a>.
    </p>`
}
exports.templateActivateAccount = async(options) => {
    return `<b>Hola, Soy Eleanor</b>
    <br/>
    <p>
    A continuación le indico su código de activación. Sólo tiene hasta el ${options.date} para utilizarlo.
    <br/>
    <ul>
        <li><strong>Código: ${options.code}</strong></li>
        <li><strong>Válido hasta: ${options.date}</strong></li>
    </ul>
    <br/>
    Validelo <a href="${process.env.ACTIVATE_ACCOUNT_URI}"><strong>aquí</strong></a>.
    </p>`
}
exports.sendEmail = async(to, from, subject, bodyHtml) => {
    // create reusable transporter object using the default SMTP transport
    const transporter = nodemailer.createTransport({
        host: process.env.APP_EMAIL_SMTP,
        secure: false, // use SSL
        port: process.env.APP_EMAIL_PORT, // port for secure SMTP
        auth: {
            user: process.env.APP_EMAIL_ACCOUNT, // generated ethereal user
            pass: process.env.APP_EMAIL_PASSWORD // generated ethereal password
        },
        tls: {
            rejectUnauthorized: false
        },
        pool: true
    });

    // send mail with defined transport object
    let fromStr = '';
    from.forEach(user => {
        fromStr += `"${user.name}" <${user.email}>,`;
    });

    let toStr = '';
    to.forEach(user => {
        toStr += `"${user.name}" <${user.email}>,`;
    });
    const emailOptions = {
        from: fromStr, // sender address
        to: toStr, // list of receivers
        subject: subject, // Subject line
        html: bodyHtml // html body
    };
    const info = await transporter.sendMail(emailOptions, function(err, info) {
        if (err) {
            console.error(`Error sending mail to ${toStr}`);
            console.error(err);
        }
        transporter.close();
    });

}