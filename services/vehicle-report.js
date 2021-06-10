const ReceptionDataSchema = require('../db/schemas/reception');
const EvaluationSchema = require('../db/schemas/evaluation');
const AssingWorkSchema = require('../db/schemas/assing-work');
const QuotationSchema = require('../db/schemas/quotation');
const BoardSchema = require('../db/schemas/board');
exports.vehicleReport = async(user) => {
    // get receptions
    let receptions = await ReceptionDataSchema.find({ companyId: { $eq: user.companyId } });

    // get evaluations
    const evaluations = await _getEvaluations(receptions);

    // get quotations
    const quotations = await _getQuotations(receptions);

    // get assing works
    const assingWork = await _getAssingWork(receptions);

    // get cards of board
    const cards = await _getCard(receptions, user.companyId);


    let vehicle;
    let vehicles = [];
    for (const reception of receptions) {
        vehicle = {
            _id: reception.vehicle._id,
            plate: reception.vehicle.plate
        }
        vehicles = vehicles.filter(x => x.plate !== vehicle.plate);
        vehicles.push(vehicle);
    }

    const response = [];
    for (const vehicle of vehicles) {
        vehicle.receptions = receptions.filter(x => x.vehicle.plate === vehicle.plate);
        vehicle.evaluations = evaluations.filter(x => x.vehicle.plate === vehicle.plate);
        vehicle.quotations = quotations.filter(x => x.vehicle.plate === vehicle.plate);
        vehicle.assingWork = assingWork.filter(x => x.vehicle.plate === vehicle.plate);
        vehicle.cards = cards.filter(x => x.card.vehicle.plate === vehicle.plate);
        response.push(vehicle);
    }

    return { response };
}
const _getEvaluations = async(receptions) => {
    const response = [];
    for (const reception of receptions) {
        const list = await EvaluationSchema.find({ receptionId: { $eq: reception._id } });
        list.forEach(item => {
            response.push(item);
        });
    }
    return response;
}
const _getQuotations = async(receptions) => {
    const response = [];
    for (const reception of receptions) {
        const list = await QuotationSchema.find({ receptionId: { $eq: reception._id } });
        list.forEach(item => {
            response.push(item);
        });
    }
    return response;
}
const _getAssingWork = async(receptions) => {
    const response = [];
    for (const reception of receptions) {
        const list = await AssingWorkSchema.find({ receptionId: { $eq: reception._id } });
        list.forEach(item => {
            response.push(item);
        });
    }
    return response;
}
const _getCard = async(receptions, companyId) => {
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