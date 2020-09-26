const Schema = require('../db/schemas/user');
const { readProfile } = require('./profile');
const { readAllMenus } = require('./menu');
const { readCompany } = require('./company');
const { sendNewUserEmail } = require('./email');
const SchemaValidateCode = require('../db/schemas/validate-code');
const ReceptionDataSchema = require('../db/schemas/reception');
const EvaluationSchema = require('../db/schemas/evaluation');
const AssingWorkSchema = require('../db/schemas/assing-work');
const QuotationSchema = require('../db/schemas/quotation');
const BoardSchema = require('../db/schemas/board');

exports.getUserCard = async (user) => {
    // get receptions
    let receptions = await ReceptionDataSchema.find({ companyId: { $eq: user.companyId } });
    console.log('receptions', receptions);
    console.log('user', user);
    receptions = receptions.filter(item => (
        item.persons.owner.email === user.email));

    // get evaluations
    const evaluations = await _getEvaluations(receptions);

    // get quotations
    const quotations = await _getQuotations(receptions);

    // get assing works
    const assingWork = await _getAssingWork(receptions);

    // get cards of board
    const cards = await _getCard(receptions, user.companyId);

    return { receptions, evaluations, quotations, assingWork, cards };
}
const _getEvaluations = async (receptions) => {
    const response = [];
    for (const reception of receptions) {
        const list = await EvaluationSchema.find({ receptionId: { $eq: reception._id } });
        list.forEach(item => {
            response.push(item);
        });
    }
    return response;
}
const _getQuotations = async (receptions) => {
    const response = [];
    for (const reception of receptions) {
        const list = await QuotationSchema.find({ receptionId: { $eq: reception._id } });
        list.forEach(item => {
            response.push(item);
        });
    }
    return response;
}
const _getAssingWork = async (receptions) => {
    const response = [];
    for (const reception of receptions) {
        const list = await AssingWorkSchema.find({ receptionId: { $eq: reception._id } });
        list.forEach(item => {
            response.push(item);
        });
    }
    return response;
}
const _getCard = async (receptions, companyId) => {
    const response = [];
    const boards = await BoardSchema.find({ companyId: { $eq: companyId } });
    for (const reception of receptions) {
        for (const board of boards) {
            for (const stage of board.stage) {
                for (const card of stage.cards) {
                    if (reception._id.equals(card.receptionId)) {
                        item = { stage: { stageId: stage.stageId }, card };
                        response.push(item);
                    }
                }
            }
        }
    }
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
exports.create = async (model) => {
    const response = await Schema.create(model);
    const token = response.getSignedJwtToken();
    const code = await this.getNewCode({ email: model.email });
    sendNewUserEmail(model.name, model.email, code);
    return token;
}
exports.createAndResponse = async (model) => {
    const response = await Schema.create(model);
    const code = await this.getNewCode({ email: model.email });
    if (model.type !== 'register') {
        sendNewUserEmail(model.name, model.email, code);
    }
    return response;
}
exports.read = async (id) => {
    const response = await Schema.findOne({ _id: { $eq: id } });
    response.menus = await this.getUserMenu(id);
    return response;
}
exports.readByEmail = async (email) => {
    const response = await Schema.findOne({ email: { $eq: email } }).select('+password');
    return response;
}
exports.update = async (id, model) => {
    const response = await Schema.updateOne({ _id: id }, model);
    return response;
}
exports.deleteOne = async (id) => {
    const response = await Schema.deleteOne({ _id: { $eq: id } });
    return response;
}
exports.realAll = async (companyId) => {
    const response = await Schema.find({ companyId: { $eq: companyId } });
    for (let index = 0; index < response.length; index++) {
        response[index].menus = await this.getUserMenu(response[index]._id);
    }
    return response;
}
exports.getUserMenu = async (id) => {
    const user = await Schema.findOne({ _id: { $eq: id } });
    if (!user) {
        return null;
    }
    if (user.root) {
        return await readAllMenus();
    }
    let response = user.menus;
    for (let index = 0; index < user.profiles.length; index++) {
        const profile = await readProfile(user.profiles[index]._id)
        for (let j = 0; j < profile.menu.length; j++) {
            const menu = profile.menu[j];
            response = response.filter(item => item.id !== menu.id);
            response.push(menu);
        }
    }

    return response

}
exports.createUser = async (user) => {
    return await this.create(user);
}
exports.getNewUser = async (companyId) => {
    const company = await readCompany(companyId);
    company.branchesOffices = [];
    return user = {
        root: false,
        company: company.name,
        companyDTO: company,
        menus: [],
        profiles: [],
        notifications: [],
        messages: [],
        createAt: new Date(),
        active: false,
        type: 'user'
    }
}