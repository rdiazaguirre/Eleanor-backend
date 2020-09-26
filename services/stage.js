const StageSchema = require('../db/schemas/stage');
exports.createStage = async (model) => {
    const response = await StageSchema.create(model);
    return response;
}
exports.readStage = async (id) => {
    const response = await StageSchema.findOne({ _id: { $eq: id } });
    return response;
}
exports.updateStage = async (id, model) => {
    const response = await StageSchema.updateOne({ _id: id }, model);
    return response;
}
exports.deleteStage = async (id) => {
    const response = await StageSchema.deleteOne({ _id: { $eq: id } });
    return response;
}
exports.readAllStages = async (companyId) => {
    const response = await StageSchema.find({ companyId: { $eq: companyId } }).sort({ order: 1 });
    if (response === null || response === undefined || response.length === 0) {
        await _insertStages(companyId);
    }
    return response;
}

exports.deleteAllStages = async (companyId) => {
    const stages = await this.readAllStages(companyId);
    stages.forEach(async (element) => {
        await this.deleteStage(element._id);
    });
    return true;
}
_insertStages = async (companyId) => {
    const initialStages = _getInitialStages();
    initialStages.forEach(element => {
        element.companyId = companyId;
        this.createStage(element);
    });
}
_getInitialStages = () => {
    return [
        { order: 1, shortName: 'PR', name: 'preparación' },
        { order: 2, shortName: 'DE', name: 'desabolladura' },
        { order: 3, shortName: 'PS', name: 'preparación de superficie' },
        { order: 4, shortName: 'PI', name: 'pintura' },
        { order: 5, shortName: 'PU', name: 'pulido' },
        { order: 6, shortName: 'ME', name: 'mecánica' },
        { order: 7, shortName: 'AR', name: 'armado' },
        { order: 8, shortName: 'LA', name: 'lavado' },
        { order: 9, shortName: 'CC', name: 'Control de calidad' },
        { order: 10, shortName: 'EN', name: 'Entrega' },
        { order: 11, shortName: 'FT', name: 'Fuera de Taller' }
    ];
}