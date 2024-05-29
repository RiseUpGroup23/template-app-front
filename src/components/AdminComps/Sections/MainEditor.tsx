import React from "react"
import { useConfig } from "../../../context/AdminContext"

const data = [
    { name: 'Nico Amico', date: '10/01', time: '13:00', action: 'Editar' },
    { name: 'Lio Messi', date: '18/12', time: '15:00', action: 'Editar' },
    { name: 'Kun Agüero', date: '18/12', time: '15:00', action: 'Editar' }
];

const MainEditor = () => {
    const { config } = useConfig()
    if (!config) return (<></>)

    return (
        <div className="mainContainer">
            <span className="initialTitle">¡Hola, <strong>{config.customization.shopName}!</strong></span>
            <span className="proxApo">
                Próximos turnos
            </span>
            <div className="blackLayout">
                <div className="proxApoHeader rowContainer">
                    <div className="rowItem" style={{ width: "50%" }}><span>Cliente</span></div>
                    <div className="rowItem" style={{ width: "calc(50% / 3)" }}><span>Día</span></div>
                    <div className="rowItem" style={{ width: "calc(50% / 3)" }}><span>Hora</span></div>
                    <div className="rowItem" style={{ width: "calc(50% / 3)" }}><span>Editar</span></div>
                </div>
                {data.map((item, index) => (
                    <div className="rowContainer" key={index}>
                        {Object.values(item).map((value, index) => (
                            <div className="rowItem" key={index} style={{ width: index === 0 ? '50%' : `calc(50% / 3)` }}>
                                <span>
                                    {value}
                                </span>
                            </div>
                        ))}
                    </div>
                ))}
            </div>
        </div>
    )
}

export default MainEditor