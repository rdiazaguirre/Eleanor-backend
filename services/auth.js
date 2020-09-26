const SchemaValidateCode = require('../db/schemas/validate-code');
const ErrorResponse = require('../class/errorResponse');
const { sendEmail, templateActivateAccount, sendResetPasswordEmail } = require('../services/email');
const { createAndResponse, read, update, readByEmail } = require('../services/user');
const { readAllMenus } = require('../services/menu');
const { createCompany } = require('../services/company');

exports.newPassword = async (model) => {
    if (!model) {
        console.error(`model not found`.red);
        throw new ErrorResponse('Error on login', 402);
    }

    if (!model.email) {
        console.error(`model.email not found`.red);
        throw new ErrorResponse('model.email not found', 402);
    }

    if (!model.code) {
        console.error(`model.code not found`.red);
        throw new ErrorResponse('model.code not found', 402);
    }

    if (!model.password) {
        console.error(`model.password not found`.red);
        throw new ErrorResponse('model.password not found', 402);
    }

    // find user
    const user = await readByEmail(model.email);
    if (!user) {
        console.error(`User not found email:${model.email}`.red);
        throw new ErrorResponse(`User not found email:${model.email}`, 401);
    }


    // find code
    const code = await this.getCode(model.code);
    if (!code) {
        console.error(`Activate code ${model.code} is not valid`.red);
        throw new ErrorResponse(`Activate code ${model.code} is not valid`, 401);
    }
    if (code.validated) {
        console.error(`Code was already validated.`.red);
        throw new ErrorResponse(`Code was already validated.`, 401);
    }
    if (user.email !== code.email) {
        console.error(`User email:${model.email} is not valid email`.red);
        throw new ErrorResponse(`User email:${model.email} is not valid email`, 401);
    }
    // update user
    user.active = false;
    user.password = await user.encrypPassword(model.password);
    await update(user._id, user);

    code.validated = true;
    await this.updateCode(code._id, code);

    const newCode = await this.getNewCode({ email: user.email });
    //send validate code to user
    sendActivateMail(user.name, user.email, newCode._id, newCode.date);

    return `Su contraseña ha sido actualizada correctamente. Ha sido enviado un correo electrónico a ${user.email} con su código de activación.`
}

exports.updateCode = async (id, model) => {
    const response = await SchemaValidateCode.updateOne({ _id: id }, model);
    return response;
}

exports.getCode = async (id) => {
    const response = await SchemaValidateCode.findOne({ _id: { $eq: id } });
    return response;
}

exports.resetPassword = async (model) => {
    if (!model) {
        console.error(`model not found`.red);
        throw new ErrorResponse('Error on login', 402);
    }

    if (!model.email) {
        console.error(`model.email not found`.red);
        throw new ErrorResponse('model.email not found', 402);
    }

    const user = await readByEmail(model.email);
    if (!user) {
        console.error(`User not found email:${model.email}`.red);
        throw new ErrorResponse(`User not found email:${model.email}`, 401);
    }

    user.active = false;
    await update(user._id, user);

    const generatedCode = await this.getNewCode({ email: user.email });

    sendResetPasswordEmail({
        name: user.name,
        email: user.email,
        code: {
            date: generatedCode.date,
            code: generatedCode._id
        }
    });
    return `Su código ha sido generado correctamente. Ha sido enviado a ${user.email}`;
}

exports.login = async (model) => {
    if (!model) {
        console.error(`model not found`.red);
        throw new ErrorResponse('Error on login', 402);
    }

    if (!model.email) {
        console.error(`model.email not found`.red);
        throw new ErrorResponse('model.email not found', 402);
    }

    if (!model.password) {
        console.error(`model.password not found`.red);
        throw new ErrorResponse('model.password not found', 402);
    }

    const user = await readByEmail(model.email);
    if (!user) {
        console.error(`User not found email:${model.email}`.red);
        throw new ErrorResponse('Invalid credentials', 401);
    }
    if (!user.active) {
        console.error(`User is not active`.red);
        throw new ErrorResponse('Invalid credentials', 401);
    }
    const isMatch = await user.matchPassword(model.password);
    if (!isMatch) {
        console.error(`password not correct email:${model.email} password:${model.password}`.red);
        throw new ErrorResponse('Invalid credentials', 401);
    }
    const token = user.getSignedJwtToken();
    return token;
}

exports.register = async (model) => {
    let message = null;
    let statusCode = null
    if (!model) {
        message = `model not found`;
        statusCode = 402;
        console.error(message.red);
        throw new ErrorResponse(message, statusCode);
    }

    if (!model.company) {
        console.error(`model.company is null`.red);
        throw new ErrorResponse(`model.company is null`, 402);
    }

    // create user company
    const company = await createCompany(
        {
            name: model.company,
            branchesOffices: [{ name: process.env.DEFAULT_BRANCH_NAME }]
        });
    model.companyDTO = company;

    // create defaul branch

    model.type = 'register';
    model.menus = await getRegisterUserMenu();
    model.root = true;
    const response = await createAndResponse(model);

    // generate activation code.
    this.generateActivateCode({ email: response.email });

    return response.getSignedJwtToken();
}
const getRegisterUserMenu = async () => {
    const response = await readAllMenus();
    return response;
}

exports.generateActivateCode = async (code) => {
    if (!code) {
        throw new ErrorResponse(`Code is not there`)
    }
    if (!code.email) {
        throw new ErrorResponse(`Email is not there`)
    }
    const user = await readByEmail(code.email);
    if (!user) {
        throw new ErrorResponse(`Account for ${code.email} does not exists. Please create it.`)
    }
    const generatedCode = await this.getNewCode({ email: user.email });

    // update user to Activated
    await activateUser(user._id, false);

    sendActivateMail(user.name, user.email, generatedCode._id, generatedCode.date);
    const response = `El código fue generado exitosamente. Fue enviado al correo electrónico ${user.email}.`;
    return response;
}

exports.getNewCode = async (code) => {
    if (!code.email) {
        code.email = code;
    }
    const response = await SchemaValidateCode.create({
        date: new Date(Date.now() + process.env.ACTIVATE_ACCOUNT_TIMEOUT * 60 * 1000),
        email: code.email
    });
    return response;
}

const activateUser = async (userId, active) => {
    const user = await read(userId);
    user.active = active;
    const response = await update(user._id, user);
    return response;
}

exports.validateCode = async (codeIn) => {
    const code = await SchemaValidateCode.findById(codeIn.code);

    if (!code) {
        throw new ErrorResponse(`Code is not valid`, 406)
    }

    if (code.validated) {
        throw new ErrorResponse(`Code ${codeIn.code} has already been validated.`, 406)
    }

    // if (Date.now() > code.date) {
    //     throw new ErrorResponse(`Code ${codeIn.code} has expired`, 406)
    // }

    if (code.email !== codeIn.email) {
        throw new ErrorResponse(`Email for ${codeIn.code} is not valid`, 406)
    }

    const user = await readByEmail(codeIn.email);
    if (!user) {
        throw new ErrorResponse(`Account for ${codeIn.email} does not exists`, 406)
    }

    code.validated = true;
    const response = await SchemaValidateCode.updateOne({ _id: code._id }, code);

    // update user to Activated
    await activateUser(user._id, true);

    return response;
}

const sendActivateMail = async (userName, email, code, date) => {
    if (!userName) {
        throw new ErrorResponse(`userName is null`, 402);
    }
    if (!email) {
        throw new ErrorResponse(`email is null`, 402);
    }
    if (!code) {
        throw new ErrorResponse(`code is null`, 402);
    }
    if (!date) {
        throw new ErrorResponse(`date is null`, 402);
    }
    const to = [{ name: userName, email: email }];
    const from = [{ name: process.env.USER_MAIL_NAME, email: process.env.USER_MAIL_EMAIL }];
    const subject = process.env.EMAIL_SUBJECT_ACTIVATION_ACCOUNT;
    const body = await templateActivateAccount({ code: code, date: date });
    await sendEmail(to, from, subject, body);
}