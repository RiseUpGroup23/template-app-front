import React from "react"
import { useConfig } from "../../../context/AdminContext"

const data = [
    { title: 'Titulo 1', description: 'CADA DETALLE IMPORTA EN TU IMAGEN', action: 'Editar' },
    { title: 'Titulo 2', description: 'En nuestra peluquería, nos especializamos en ...', action: 'Editar' }
];

const Customization = () => {
    const { config } = useConfig()
    if (!config) return (<></>)

    return (
        <div className="mainContainer">
            <span className="initialTitle">¡Hola, <strong>{config.customization.shopName}!</strong></span>
            <span className="proxApo">
                Personalizar página
            </span>
            <div className="blackLayout">
                <div className="proxApoHeader rowContainer">
                    <div className="rowItem" style={{ width: "35%" }}><span>Secciones</span></div>
                    <div className="rowItem" style={{ width: "45%" }}><span>Vista Previa</span></div>
                    <div className="rowItem" style={{ width: "20%" }}><span>Editar</span></div>
                </div>
                {data.map((item, index) => (
                    <div className="rowContainer" key={index}>
                        {Object.values(item).map((value, index) => (
                            <div className="rowItem" key={index} style={{ width: index === 0 ? '35%' : index === 1 ? '45%' : '20%' }}>
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

export default Customization