import React, { useEffect } from "react"
import { useConfig } from "../../../context/AdminContext"
import { renderProfessionalRow } from "../Rows/rows"

const Professionals = () => {
    const { newConfig, professionals, fetchProfessionals } = useConfig()

    useEffect(() => {
        fetchProfessionals()
        //eslint-disable-next-line
    }, [])

    if (!newConfig) return (<></>)

    return (
        <div className="mainContainer">
            <span className="initialTitle">¡Hola, <strong>{newConfig.customization.shopName}!</strong></span>
            <span className="proxApo">
                Editar profesionales
            </span>
            <div className="blackLayout">
                <div className="proxApoHeader rowContainer">
                    <div className="rowItem" style={{ width: "35%" }}><span>Nombre</span></div>
                    <div className="rowItem" style={{ width: "45%" }}><span>Vista Previa</span></div>
                    <div className="rowItem" style={{ width: "20%" }}><span>Editar</span></div>
                </div>
                {professionals?.map((prof) => renderProfessionalRow(prof))}
            </div>
        </div>
    )
}

export default Professionals