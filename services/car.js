
const Schema = require('../db/schemas/car-part');

exports.create = async (model) => {
    const response = await Schema.create(model);
    return response;
}
exports.read = async (id) => {
    const response = await Schema.findOne({ _id: { $eq: id } });
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
exports.readAll = async (companyId) => {
    const response = await Schema.find({ companyId: { $eq: companyId } });
    return response;
}

exports.getInventory = () => {
    return [
        { id: '1', name: 'Emblemas' },
        { id: '2', name: 'Espejos esteriores' },
        { id: '3', name: 'Espejo interior' },
        { id: '4', name: 'Antena' },
        { id: '5', name: 'Plumillas' },
        { id: '6', name: 'Cenicero' },
        { id: '72', name: 'Sombrillas' },
        { id: '82', name: 'Pisos de goma' },
        { id: '992', name: 'Documentos' },
        { id: '102', name: 'Tapa de becina' },
        { id: '112', name: 'Parlantes' },
        { id: '122', name: 'Encendor' },
        { id: '132', name: 'Tapas de rueda' },
        { id: '142', name: 'Set de herramientas' },
        { id: '152', name: 'Rueda de repuesto' },
        { id: '162', name: 'Radio' },
        { id: '172', name: 'Panel' },
        { id: '182', name: 'Tag' },
        { id: '192', name: 'Botiquín' },
        { id: '202', name: 'Consola' }
    ];
}