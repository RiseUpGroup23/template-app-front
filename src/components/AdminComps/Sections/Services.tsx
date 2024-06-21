import React, { useEffect } from "react"
import { useConfig } from "../../../context/AdminContext"
import AddIcon from '@mui/icons-material/Add';
import { RenderServiceRow } from "../Rows/rows"
import ServiceModal from "../Buttons/ServiceModal";
import { TypeOfService } from "../../../typings/TypeOfServices";

const Services = () => {
    const { fetchServices, services, newConfig } = useConfig()

    useEffect(() => {
        fetchServices()
        //eslint-disable-next-line
    }, [])

    if (!newConfig) return (<></>)

    return (
        <div className="mainContainer">
            <span className="initialTitle">¡Hola, <strong>{newConfig.customization.shopName}!</strong></span>
            <span className="proxApo">
                <div className="headerWithButton">
                    <span>Editar servicios</span>
                    <ServiceModal service={{} as TypeOfService} customTrigger={
                        <button className="newProfButton">
                            <AddIcon />
                            Agregar
                        </button>
                    } />
                </div>
            </span>
            <div className="blackLayout">
                <div className="proxApoHeader rowContainer">
                    <div className="rowItem" style={{ width: "35%" }}><span>Nombre</span></div>
                    <div className="rowItem" style={{ width: "40%" }}><span>Vista Previa</span></div>
                    <div className="rowItem" style={{ width: "25%" }}><span>Editar</span></div>
                </div>
                {services?.map((service) => RenderServiceRow(service))}
            </div>
        </div>
    )
}

export default Services