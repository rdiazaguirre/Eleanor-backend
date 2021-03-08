const ReceptionDataSchema = require('../db/schemas/reception');
const { readCompany } = require('./company');
const { createEvaluation, getEvaluationByReceptionId, updateEvaluation, removeEvaluation } = require('./evaluation');
const { removeQuotation, getQuotationByReceptionId } = require('./quotation');
const { getAssingWorkByReceptionId, removeAssigWork } = require('./assign-work');
const { readByEmail, createAndResponse, getNewUser } = require('./user');

exports.updateReception = async(id, model) => {
    return await this.update(id, model);
}
exports.readReception = async(id) => {
    return await this.get(id);
}

exports.readAllReception = async(companyId, branchOfficeId) => {
    return await this.getAll(companyId, branchOfficeId);
}

exports.create = async(model) => {
    const response = await ReceptionDataSchema.create(model);

    // Generate the evaluation
    const evaluationModel = _getEvaluacionFromReception(response);
    await createEvaluation(evaluationModel);

    // Send invitation mail to vehicle Owner(must be created a user to customer.)
    _generateUserFromCustomer(response.persons.owner, response.companyId, model.createdBy, model.branchOfficeId);
    return response;
}

exports.remove = async(id) => {
    const response = await ReceptionDataSchema.deleteOne({ _id: { $eq: id } });

    // Remove evaluation
    const evaluation = await getEvaluationByReceptionId(id);
    if (evaluation) {
        await removeEvaluation(evaluation._id);
    }

    // Remove quotation
    const quotation = await getQuotationByReceptionId(id);
    if (quotation) {
        await removeQuotation(quotation._id);
    }

    // Remove assign work
    const assingWork = await getAssingWorkByReceptionId(id);
    if (assingWork) {
        await removeAssigWork(assingWork._id);
    }

    //remove card of board

    return response;
}

exports.get = async(id) => {
    return await ReceptionDataSchema.findOne({ _id: { $eq: id } });
}

exports.update = async(id, model) => {
    const response = await ReceptionDataSchema.updateOne({ _id: id }, model);
    const evaluation = await getEvaluationByReceptionId(id);
    const reception = await this.get(id);
    const evaluationToUpdate = _getEvaluacionToUpdate(evaluation, reception);
    const evaluationResult = updateEvaluation(evaluationToUpdate._id, evaluation, false);
    return response;
}

exports.getAll = async(companyId, branchId) => {
    if (companyId === null) {
        return await ReceptionDataSchema.find({
            branchOfficeId: { $eq: branchId }
        });
    }
    return await ReceptionDataSchema.find({
        companyId: { $eq: companyId },
        branchOfficeId: { $eq: branchId }
    });
}

const _getEvaluacionToUpdate = (evaluation, reception) => {
    evaluation.receptionId = reception._id;
    evaluation.vehicle = reception.vehicle;
    evaluation.damages = reception.damages;
    return evaluation;
}
const _getEvaluacionFromReception = (reception) => {
    const response = {
        receptionId: reception._id,
        deliveryDate: new Date(),
        deliveryTime: new Date(),
        status: 3,
        vehicle: reception.vehicle,
        damages: reception.damages,
        workers: reception.workers,
        createdBy: reception.createdBy,
        createAt: new Date(),
        quoter: { Id: 0, email: '', phone: '' },
        companyId: reception.companyId,
        branchOfficeId: reception.branchOfficeId,
        claimNumber: reception.claimNumber
    }
    response.damages.forEach(element => {
        element.actionId = 0;
    });
    return response;
}

const _generateUserFromCustomer = async(customer, companyId, createdBy, branchOfficeId) => {
    let user = await readByEmail(customer.email);
    if (user !== null) {
        return;
    }
    user = await getNewUser(companyId);
    user.name = customer.name;
    user.email = customer.email;
    user.charge = process.env.CUSTOMER_USER_CHARGE;
    user.password = process.env.CUSTOMER_USER_PASSWORD_DEFAULT;
    user.companyId = companyId;
    user.createdBy = createdBy;
    user.menus = [
        { "id": 4, "name": "Configuraciones" },
        { "id": 41, "name": "Mi Cuenta" },
        { "id": 44, "name": "Mi Vehículo" }
    ];

    // Assign branches offices
    user.companyDTO.branchesOffices = await _getbranchesOffices(companyId, branchOfficeId);

    createAndResponse(user).then(user => {
        console.info('user created', user);
    }).catch(reason => {
        console.error('error user created', reason);
    });
}
const _getbranchesOffices = async(companyId, branchOfficeId) => {
    const company = await readCompany(companyId);
    for (let index = 0; index < company.branchesOffices.length; index++) {
        const item = company.branchesOffices[index];
        if (item._id.equals(branchOfficeId)) {
            return [item];
        }

    }
    return null;
}