const AssingWorkSchema = require('../db/schemas/assing-work');
const ReceptionDataSchema = require('../db/schemas/reception');
const EvaluationSchema = require('../db/schemas/evaluation');
const QuotationSchema = require('../db/schemas/quotation');
const { readAllBoard, updateBoard } = require('../services/board');

const readReception = async(id) => {
    return await ReceptionDataSchema.findOne({ _id: { $eq: id } });
}
const updateReception = async(id, model) => {
    const response = await ReceptionDataSchema.updateOne({ _id: id }, model);
}
const getEvaluationByReceptionId = async(receptionId) => {
    return await EvaluationSchema.findOne({ receptionId: { $eq: receptionId } });
}
const updateEvaluation = async(id, model, insertQuotation) => {
    const response = await EvaluationSchema.updateOne({ _id: id }, model);
    return response;
}
const getQuotationByReceptionId = async(receptionId) => {
    const response = await QuotationSchema.findOne({ receptionId: receptionId });
    return response;
}
const updateQuotation = async(id, model) => {
    const response = await QuotationSchema.updateOne({ _id: id }, model);
    return response;
}
exports.getAllAssigWorks = async(companyId, branchId) => {
    if (companyId === null) {
        return await AssingWorkSchema.find({
            branchOfficeId: { $eq: branchId }
        });
    }
    return await AssingWorkSchema.find({
        companyId: { $eq: companyId },
        branchOfficeId: { $eq: branchId }
    });
}

exports.createAssigWork = async(model) => {
    const response = await AssingWorkSchema.create(model);
    _updateWorkersFromAssignWork(response);
    return response;
}
_updateWorkersFromAssignWork = async(model) => {
    // Asign workers to board card
    _assingWorkersToCard(model);

    // Update quotation's workers
    _updateQuotationWorkers(model);

    // Update evaluation's workers
    _updateEvaluationWorkers(model);

    // Update reception's workers
    _updateReceptionWorkers(model);

}
const _updateQuotationWorkers = async(model) => {
    const quotation = await getQuotationByReceptionId(model.receptionId);
    quotation.workers = model.workers;
    updateQuotation(quotation._id, quotation);
}
const _updateEvaluationWorkers = async(model) => {
    const evaluation = await getEvaluationByReceptionId(model.receptionId);
    evaluation.workers = model.workers;
    updateEvaluation(evaluation._id, evaluation);
}
const _updateReceptionWorkers = async(model) => {
    const reception = await readReception(model.receptionId);
    reception.workers = model.workers;
    updateReception(reception._id, reception);
}
const _assingWorkersToCard = async(model) => {
    const board = await readAllBoard(model.companyId, model.createdBy, model.branchOfficeId);
    if (board[0]) {
        board[0].stage.forEach(element => {
            element.cards.forEach(card => {
                if (card.receptionId === model.receptionId) {
                    card.workers = model.workers;
                    card.works = model.works;
                }
            });
        });
        await updateBoard(board[0]._id, board[0]);
    }
}
exports.removeAssigWork = async(id) => {
    const response = await AssingWorkSchema.deleteOne({ _id: { $eq: id } });
    return response;
}

exports.updateAssigWork = async(id, model) => {
    const response = await AssingWorkSchema.updateOne({ _id: id }, model);
    _updateWorkersFromAssignWork(model);
    return response;
}

exports.getAssingWorkByReceptionId = async(receptionId) => {
    return await AssingWorkSchema.findOne({ receptionId: receptionId });
}

exports.getAssingWorkQuotationId = async(quotationId) => {
    return await AssingWorkSchema.findOne({ quotationId: quotationId });
}

exports.getAssingWorkFromQuotation = (assingWork, quotation) => {
    if (assingWork) {
        assingWork.receptionId = quotation.receptionId;
        assingWork.evaluationId = quotation.evaluationId;
        assingWork.quotationId = quotation._id;
        assingWork.vehicle = quotation.vehicle;
        assingWork.damages = quotation.damages;
        assingWork.workers = quotation.workers;
        assingWork.createdBy = quotation.createdBy;
        assingWork.quoter = quotation.quoter;
        assingWork.planification = quotation.planification;
        assingWork.companyId = quotation.companyId;
        assingWork.branchOfficeId = quotation.branchOfficeId;
        assingWork.claimNumber = quotation.claimNumber;
        return assingWork;
    } else {
        const response = {
            receptionId: quotation.receptionId,
            evaluationId: quotation.evaluationId,
            quotationId: quotation._id,
            deliveryDate: new Date(),
            deliveryTime: new Date(),
            status: 3,
            vehicle: quotation.vehicle,
            damages: quotation.damages,
            workers: quotation.workers,
            createdBy: quotation.createdBy,
            createAt: new Date(),
            quoter: quotation.quoter,
            planification: quotation.planification,
            works: [],
            companyId: quotation.companyId,
            branchOfficeId: quotation.branchOfficeId,
            claimNumber: quotation.claimNumber
        };
        return response;
    }
}