exports.getClientMenu = async() => {
    const response = [
        { id: 4, name: 'Configuraciones' },
        { id: 41, name: 'Mi Cuenta' },
        { id: 44, name: 'Mi Vehículo' }
    ];
    return response;
}
exports.readAllMenus = async() => {
    const response = [
        { id: 1, name: 'Dashboard' },
        { id: 2, name: 'Ingreso de Vehículo' },
        { id: 20, name: 'Recepción' },
        { id: 21, name: 'Evaluación' },
        { id: 22, name: 'Cotización' },
        { id: 23, name: 'Orden de Trabajo' },
        { id: 3, name: 'Flujo de Trabajo' },
        { id: 4, name: 'Configuraciones' },
        { id: 40, name: 'Parámetros' },
        { id: 41, name: 'Mi Cuenta' },
        { id: 42, name: 'Usuarios' },
        { id: 43, name: 'Aprobar Cotizaciones' },
        { id: 44, name: 'Mi Vehículo' },
        { id: 50, name: 'Listado de Vehículos' }
    ];
    return response;
}