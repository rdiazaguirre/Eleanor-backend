const BoardSchema = require('../db/schemas/board');
const { readAllStages } = require('./stage');

exports.readAllCardByBranchOfficeId = async (branchOfficeId) => {
    const boards = await BoardSchema.find({ branchOfficeId: { $eq: branchOfficeId } });
    const response = [];
    for (const board of boards) {
        for (const stage of board.stage) {
            for (const card of stage.cards) {
                const newcard = {
                    stageId: stage.stageId,
                    receptionId: card.receptionId,
                    vehicle: card.vehicle,
                    status: card.status,
                    workers: card.workers,
                    planification: card.planification,
                    works: card.works,
                    comments: card.comments,
                    history: card.history,
                    createdAt: card.createdAt,
                    createdBy: card.createdBy,
                    companyId: card.companyId,
                    branchOfficeId: card.branchOfficeId,
                    createdByUser: card.createdByUser
                }
                response.push(newcard);
            }
        }
    }
    return response;
}
exports.createBoard = async (model) => {
    const response = await BoardSchema.create(model);
    return response;
}
exports.readBoard = async (id) => {
    const response = await BoardSchema.findOne({ _id: { $eq: id } });
    return response;
}
exports.updateBoard = async (id, model) => {
    console.log('updateBoard')
    const response = await BoardSchema.updateOne({ _id: id }, model);
    return response;
}
exports.deleteBoard = async (id) => {
    const response = await BoardSchema.deleteOne({ _id: { $eq: id } });
    return response;
}
exports.readAllBoard = async (companyId, createdBy, branchId) => {
    const response = await BoardSchema.find(
        { branchOfficeId: { $eq: branchId } });

    if (!response || response === null || response.length === 0) {
        const stages = await readAllStages(companyId);
        const newBoard = _getNewBoard(companyId, branchId, stages);
        await this.createBoard(newBoard);
        return await this.readAllBoard(companyId, createdBy, branchId);
    }
    return response;
}
const _getNewBoard = (companyId, branchId, stages) => {

    const response = {
        stage: [],
        companyId: companyId,
        branchOfficeId: branchId
    }
    for (let index = 0; index < stages.length; index++) {
        response.stage.push(
            {
                order: stages[index].order,
                stageId: stages[index]._id
            }
        );

    }
    return response;
}
exports.readBoards = async () => {
    return await BoardSchema.find();
}