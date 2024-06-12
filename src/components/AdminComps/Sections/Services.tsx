import React, { useEffect } from "react"
import { useConfig } from "../../../context/AdminContext"
import { renderServiceRow } from "../Rows/rows"

const Services = () => {
    const { fetchServices, services, setServices, newConfig } = useConfig()

    useEffect(() => {
        fetchServices()
        //eslint-disable-next-line
    }, [])

    useEffect(() => {
        console.log("soy servicios", services);

    }, [services])

    if (!newConfig) return (<></>)

    return (
        <div className="mainContainer">
            <span className="initialTitle">¡Hola, <strong>{newConfig.customization.shopName}!</strong></span>
            <span className="proxApo">
                Editar servicios
            </span>
            <div className="blackLayout">
                <div className="proxApoHeader rowContainer">
                    <div className="rowItem" style={{ width: "35%" }}><span>Nombre</span></div>
                    <div className="rowItem" style={{ width: "45%" }}><span>Vista Previa</span></div>
                    <div className="rowItem" style={{ width: "20%" }}><span>Editar</span></div>
                </div>
                {services?.map(({ name, image }) => renderServiceRow(name, image))}
            </div>
        </div>
    )
}

export default Services