import * as XLSX from 'xlsx';

const downloadExcel = (data: any[]) => {
    const wsData = data.map(item => ({
        'Nombre del Cliente': item.customer.name,
        'Apellido del Cliente': item.customer.lastname,
        'Número de Teléfono': item.customer.phoneNumber,
        'Fecha': new Date(item.date).toLocaleDateString('es-ES'),
        'Hora': new Date(item.date).toJSON().split("T")[1].slice(0, 5),
        'Servicio': item.typeOfService.name,
    }));

    const ws = XLSX.utils.json_to_sheet(wsData, {
        header: [
            'Nombre del Cliente',
            'Apellido del Cliente',
            'Número de Teléfono',
            'Fecha',
            'Hora',
            'Servicio',
        ]
    });

    const wb = XLSX.utils.book_new();
    XLSX.utils.book_append_sheet(wb, ws, 'Datos');

    const excelBuffer = XLSX.write(wb, { bookType: 'xlsx', type: 'array' });

    const blob = new Blob([excelBuffer], { type: 'application/vnd.openxmlformats-officedocument.spreadsheetml.sheet' });
    const url = URL.createObjectURL(blob);

    const link = document.createElement('a');
    link.href = url;
    link.download = 'Turnos con conflictos.xlsx';
    link.click();

    URL.revokeObjectURL(url);
};

export default downloadExcel