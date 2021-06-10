const EvaluationSchema = require('../db/schemas/evaluation');
const {
    getQuotationByEvaluationId,
    createQuotation,
    updateQuotation,
    removeQuotation,
    getQuotationFromEvaluation } = require('../services/quotation');

exports.createEvaluation = async (model) => {
    /*there are not bussines logic when create a evaluation*/
    const response = await EvaluationSchema.create(model);
    return response;
}

exports.removeEvaluation = async (id) => {
    return await EvaluationSchema.deleteOne({ _id: { $eq: id } });
}

exports.getEvaluation = async (id) => {
    return await EvaluationSchema.findOne({ _id: { $eq: id } });
}

exports.getEvaluationByReceptionId = async (receptionId) => {
    return await EvaluationSchema.findOne({ receptionId: { $eq: receptionId } });
}

exports.getAllEvaluation = async (companyId, branchId) => {
    if (companyId === null) {
        return await EvaluationSchema.find({
            branchOfficeId: { $eq: branchId }
        });
    }
    return await EvaluationSchema.find(
        {
            companyId: { $eq: companyId },
            branchOfficeId: { $eq: branchId }
        });
}
exports.updateEvaluation = async (id, model, insertQuotation) => {
    const response = await EvaluationSchema.updateOne({ _id: id }, model);
    if (insertQuotation) {
        const quotation = await getQuotationByEvaluationId(id);
        const evaluation = await this.getEvaluation(id);
        const quotationToMongo = getQuotationFromEvaluation(quotation, evaluation);
        if (quotation) {
            // Update it
            await updateQuotation(quotationToMongo._id, quotationToMongo);
        } else {
            // Create it
            await createQuotation(quotationToMongo)
        }
    }
    return response;
}

