exports.readAll = async () => {
    const response = [
        { _id: '1', name: 'Acciones' },
        { _id: '2', name: 'Compañias Aseguradoras' },
        { _id: '3', name: 'Marcas de Vehículos' },
        { _id: '4', name: 'Modelos de Vehículo' },
        { _id: '5', name: 'Partes del Vehículo' },
        { _id: '6', name: 'Tipos de Documentos' },
        { _id: '7', name: 'Cotizadores' },
        { _id: '8', name: 'Areas de Trabajo' },
        { _id: '9', name: 'Trabajadores' },
        { _id: '10', name: 'Sucursales' },
        { _id: '11', name: 'Perfiles de Usuario' },
        { _id: '12', name: 'PERFILES - MENU' }       
    ]
    return response.sort((a, b) => {
        // Use toUpperCase() to ignore character casing
        const nameA = a.name.toUpperCase();
        const nameB = b.name.toUpperCase();

        let comparison = 0;
        if (nameA > nameB) {
            comparison = 1;
        } else if (nameA < nameB) {
            comparison = -1;
        }
        return comparison;
    });
}