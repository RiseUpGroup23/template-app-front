import React from "react"
import { useConfig } from "../../../context/AdminContext"

const data = [
    { title: 'Titulo 1', description: 'CADA DETALLE IMPORTA EN TU IMAGEN', action: 'Editar' },
    { title: 'Titulo 2', description: 'En nuestra peluquería, nos especializamos en ...', action: 'Editar' }
];

const Customization = () => {
    const { newConfig } = useConfig()
    if (!newConfig) return (<></>)

    return (
        <div className="mainContainer">
            <span className="initialTitle">¡Hola, <strong>{newConfig.customization.shopName}!</strong></span>
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
            <span className="proxApo">
                Paleta de colores
                <div className="blackLayout">
                    <div className="colorsContainer">
                        <span className="colorGroupName">Paleta principal</span>
                        <div className="colorDemo" style={{ background: `${newConfig.customization.primary.color}` }}></div>
                        <div className="colorDemo" style={{ background: `${newConfig.customization.primary.text}` }}></div>
                        <img className="colorDemo" src={newConfig.customization.logo.primary} alt="logoPrimary" />
                    </div>
                    <div className="colorsContainer">
                        <span className="colorGroupName">Paleta secundaria</span>
                        <div className="colorDemo" style={{ background: `${newConfig.customization.secondary.color}` }}></div>
                        <div className="colorDemo" style={{ background: `${newConfig.customization.secondary.text}` }}></div>
                        <img className="colorDemo" src={newConfig.customization.logo.secondary} alt="logoSecondary" />
                    </div>
                </div>
            </span>
        </div>
    )
}

export default Customization