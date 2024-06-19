import React, { useEffect, useState } from "react"
import { useConfig } from "../../../context/AdminContext"
import { useMediaQuery } from "@mui/material";
import DeleteModal from "../Buttons/DeleteModal";

let data = [
    { _id: "sa239", name: 'Nico Amico', date: '10/01', time: '13:00', action: 'Editar' },
    { _id: "sa239", name: 'Lio Messi', date: '18/12', time: '15:00', action: 'Editar' },
    { _id: "sa239", name: 'Kun Agüero', date: '18/12', time: '15:00', action: 'Editar' },
    { _id: "sa239", name: 'Diego Maradona', date: '10/10', time: '15:00', action: 'Editar' }
];

const meses = [
    "Enero", "Febrero", "Marzo", "Abril", "Mayo", "Junio",
    "Julio", "Agosto", "Septiembre", "Octubre", "Noviembre", "Diciembre"
];

const diasSemana = ["Lunes", "Martes", "Miércoles", "Jueves", "Viernes", "Sábado", "Domingo"];

function renderizarCalendario(mes: number, diaSeleccionado: number | null, onDiaClick: (dia: number) => void, setDate: (date: Date) => void): JSX.Element[] {
    let año = new Date().getFullYear();
    if (mes > 12) {
        año += Math.floor((mes - 1) / 12); // Sumar años completos
        mes = (mes - 1) % 12 + 1; // Obtener el mes dentro del rango 1-12
    }

    const fechaInicio = new Date(año, mes - 1, 1);
    const primerDiaSemana = fechaInicio.getDay() === 0 ? 6 : fechaInicio.getDay() - 1;
    const diasMesAnterior = new Date(fechaInicio.getFullYear(), fechaInicio.getMonth(), 0).getDate();
    const diasMes = new Date(fechaInicio.getFullYear(), fechaInicio.getMonth() + 1, 0).getDate();

    const calendarDays: JSX.Element[] = [];

    // Días del mes anterior
    for (let i = primerDiaSemana - 1; i >= 0; i--) {
        calendarDays.push(
            <div className="calendarDay notThisMonth" key={`prev-${i}`}>
                <span>{diasMesAnterior - i}</span>
            </div>
        );
    }

    // Días del mes actual
    for (let i = 1; i <= diasMes; i++) {
        const isSelected = diaSeleccionado === i;

        calendarDays.push(
            <div className={`calendarDay ${isSelected ? "selected" : ""}`} key={`current-${i}`} onClick={() => {
                onDiaClick(i);
                const selectedDate = new Date(año, mes - 1, i);
                setDate(selectedDate);
            }}>
                <span>{i} <p className="info">99 turnos</p></span>
            </div>
        );
    }

    // Completar los días restantes hasta llegar a 35 elementos
    const totalDias = primerDiaSemana + diasMes;
    const diasRestantes = 35 - totalDias;
    for (let i = 1; i <= diasRestantes; i++) {
        calendarDays.push(
            <div className="calendarDay notThisMonth" key={`next-${i}`}>
                <span>{i}</span>
            </div>
        );
    }

    return calendarDays;
}




const Appointments = () => {
    const { newConfig, cancelAppointment } = useConfig()
    const [actualMonth, setActualMonth] = useState(new Date().getMonth())
    const [selected, setSelected] = useState(new Date().getDate())
    const [date, setDate] = useState(new Date())
    const isMobile = useMediaQuery('(max-width:1400px)');

    useEffect(() => {
        if (actualMonth !== new Date().getMonth()) {
            setSelected(0)
        } else {
            setSelected(new Date().getDate())
            setDate(new Date())
        }
    }, [actualMonth])

    if (!newConfig) return (<></>)
    return (
        <div className="mainContainer">
            <span className="initialTitle">¡Hola, <strong>{newConfig.customization.shopName}!</strong></span>
            <span className="proxApo">
                <div className="apoTitle">
                    Todos los turnos
                    <div className="monthsSelector">
                        {new Date().getMonth() < actualMonth && <button onClick={() => setActualMonth(prev => prev - 1)}>
                            <svg style={{ transform: "rotate(90deg)" }} width="30" height="17" viewBox="0 0 30 17" fill="none" xmlns="http://www.w3.org/2000/svg">
                                <path d="M16.4142 16.4142C15.6332 17.1953 14.3668 17.1953 13.5858 16.4142L0.857865 3.68629C0.076816 2.90524 0.0768161 1.63891 0.857865 0.857864C1.63891 0.076815 2.90524 0.0768151 3.68629 0.857864L15 12.1716L26.3137 0.857865C27.0948 0.0768161 28.3611 0.0768162 29.1421 0.857865C29.9232 1.63891 29.9232 2.90524 29.1421 3.68629L16.4142 16.4142ZM17 13L17 15L13 15L13 13L17 13Z" fill="white" fillOpacity="0.8" />
                            </svg>
                        </button>}
                        <div><strong>{meses[actualMonth % 12]}</strong> ({new Date().getFullYear() + Math.floor((actualMonth) / 12)})</div>
                        <button onClick={() => setActualMonth(prev => prev + 1)}>
                            <svg style={{ transform: "rotate(270deg)" }} width="30" height="17" viewBox="0 0 30 17" fill="none" xmlns="http://www.w3.org/2000/svg">
                                <path d="M16.4142 16.4142C15.6332 17.1953 14.3668 17.1953 13.5858 16.4142L0.857865 3.68629C0.076816 2.90524 0.0768161 1.63891 0.857865 0.857864C1.63891 0.076815 2.90524 0.0768151 3.68629 0.857864L15 12.1716L26.3137 0.857865C27.0948 0.0768161 28.3611 0.0768162 29.1421 0.857865C29.9232 1.63891 29.9232 2.90524 29.1421 3.68629L16.4142 16.4142ZM17 13L17 15L13 15L13 13L17 13Z" fill="white" fillOpacity="0.8" />
                            </svg>
                        </button>
                    </div>
                </div>
            </span>

            <div className="blackLayout">
                <div className="calendarBox">
                    <div className="proxApoHeader rowContainer">
                        {diasSemana.map((e) => isMobile ? e.slice(0, 3) : e).map((dia) => (
                            <div key={dia} className="rowItem" style={{ width: `calc(100% / ${diasSemana.length})` }}>{dia}</div>
                        ))}
                    </div>
                    <div className="AdminCalendarContainer">
                        {renderizarCalendario(actualMonth + 1, selected, setSelected, setDate)}
                    </div>
                </div>
            </div>

            {selected !== 0 &&
                <>
                    <span className="proxApo">
                        {diasSemana[date.getDay() - 1]} - {date.toLocaleDateString('es-ES', { year: 'numeric', month: '2-digit', day: '2-digit' })
                    }
                    </span>
                    <div className="apoCards">
                        {data.map((apo) => (
                            <div className="apoCard">
                                <div className="apoCardInfo">
                                    <span className="apoCardName">
                                        {apo.name} -
                                    </span>
                                    <span className="apoCardName">
                                        {apo.time}
                                    </span>
                                </div>
                                <div className="apoCardEdit">
                                    <DeleteModal message="¿Desea cancelar este turno?" action={() => cancelAppointment(apo._id)} />
                                </div>
                            </div>
                        ))}
                    </div>
                </>
            }
        </div>
    )
}

export default Appointments