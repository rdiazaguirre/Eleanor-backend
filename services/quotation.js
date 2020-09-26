const QuotationSchema = require('../db/schemas/quotation');
const { createAssigWork, getAssingWorkQuotationId, getAssingWorkFromQuotation, updateAssigWork } = require('../services/assign-work');
const { updateBoard, readAllBoard } = require('./board');
const { createCard } = require('./card');

exports.createQuotation = async (model) => {
    const response = await QuotationSchema.create(model);
    return response;
}

exports.removeQuotation = async (id) => {
    const response = await QuotationSchema.deleteOne({ _id: { $eq: id } });
    return response;
}

exports.updateQuotation = async (id, model) => {
    const response = await QuotationSchema.updateOne({ _id: id }, model);
    return response;
}
exports.aproveQuotation = async (id, model, user) => {
    const response = await QuotationSchema.updateOne({ _id: id }, model);
    const quotation = await this.getQuotation(id);

    // insert card in da board
    await _insertCard(quotation, model.createdBy, model.companyId, model.branchOfficeId, user);

    // create the assign work
    await _insertAssingWork(id, quotation, model.createdBy, model.companyId);

    return response;
}
const _insertCard = async (quotation, createdBy, companyId, branchId, user) => {
    const board = await readAllBoard(companyId, createdBy, branchId);
    board.forEach(element => {
        element.stage.forEach(async itemStage => {
            itemStage.cards = itemStage.cards.filter((item) => item.receptionId !== quotation.receptionId);
            if (itemStage.stageId === quotation.planification.intialStageId) {
                const card = _newCard(quotation, createdBy, companyId, user);
                itemStage.cards.push(card);
            }
        });
        updateBoard(element._id, element);
    });
}
_newCard = (quotation, createdBy, companyId, user) => {
    const newCard = {
        receptionId: quotation.receptionId,
        vehicle: quotation.vehicle,
        workers: quotation.workers,
        status: 3,
        planification: {
            startDate: quotation.planification.startDate,
            endDate: quotation.planification.endDate
        },
        works: [],
        comments: [],
        history: [{
            stageId: quotation.planification.intialStageId,
            createdAt: new Date(),
            createdBy: createdBy
        }],
        createdAt: new Date(),
        createdBy: createdBy,
        companyId: companyId,
        createdByUser: user,
        branchOfficeId: quotation.branchOfficeId
    };

    return newCard;
}
_insertAssingWork = async (id, quotation, createdBy, companyId) => {
    const assingWork = await getAssingWorkQuotationId(id);
    const assingWorkToMongo = getAssingWorkFromQuotation(assingWork, quotation);
    if (assingWork) {
        await updateAssigWork(assingWorkToMongo._id, assingWorkToMongo);
    } else {
        await createAssigWork(assingWorkToMongo);
    }
}
exports.getQuotation = async (id) => {
    const response = await QuotationSchema.findOne({ _id: id });
    return response;
}

exports.getQuotations = async (companyId, branchId) => {
    if (companyId === null) {
        return await QuotationSchema.find({
            branchOfficeId: { $eq: branchId }
        });
    }
    const response = await QuotationSchema.find(
        {
            companyId: { $eq: companyId },
            branchOfficeId: { $eq: branchId }
        });
    return response;
}

exports.getQuotationByEvaluationId = async (evaluationId) => {
    const response = await QuotationSchema.findOne({ evaluationId: { $eq: evaluationId } });
    return response;
}

exports.getQuotationByReceptionId = async (receptionId) => {
    const response = await QuotationSchema.findOne({ receptionId: receptionId });
    return response;
}

exports.getQuotationFromEvaluation = (quotation, evaluation) => {
    if (quotation) {
        quotation.receptionId = evaluation.receptionId;
        quotation.evaluationId = evaluation._id;
        quotation.deliveryDate = evaluation.deliveryDate;
        quotation.deliveryTime = evaluation.deliveryTime;
        quotation.status = evaluation.status;
        quotation.vehicle = evaluation.vehicle;
        quotation.damages = evaluation.damages;
        quotation.workers = evaluation.workers;
        quotation.createdBy = evaluation.createdBy;
        quotation.createAt = evaluation.createAt;
        quotation.quoter = evaluation.quoter;
        quotation.companyId = evaluation.companyId;
        quotation.branchOfficeId = evaluation.branchOfficeId;
        return quotation;
    } else {
        const response = {
            receptionId: evaluation.receptionId,
            evaluationId: evaluation._id,
            deliveryDate: evaluation.deliveryDate,
            deliveryTime: evaluation.deliveryTime,
            status: evaluation.status,
            vehicle: evaluation.vehicle,
            damages: evaluation.damages,
            workers: evaluation.workers,
            createdBy: evaluation.createdBy,
            createAt: evaluation.createAt,
            quoter: evaluation.quoter,
            planification: {
                quantityDays: 0,
                intialStageId: 0,
                startDate: {},
                endDate: {}
            },
            companyId: evaluation.companyId,
            branchOfficeId: evaluation.branchOfficeId
        };
        response.damages.forEach(element => {
            element.amount = 0;
        });
        return response;
    }

}