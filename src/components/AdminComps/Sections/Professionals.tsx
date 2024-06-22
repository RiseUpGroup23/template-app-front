import React, { useEffect } from "react"
import { useConfig } from "../../../context/AdminContext"
import { RenderProfessionalRow } from "../Rows/rows"
import AddIcon from '@mui/icons-material/Add';
import ProfessionalModal from "../Buttons/ProfessionalModal";
import { Professional } from "../../../typings/Professional";

const Professionals = () => {
    const { newConfig, professionals, fetchProfessionals, fetchServices } = useConfig()

    useEffect(() => {
        fetchProfessionals()
        fetchServices()
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
                    <div className="rowItem" style={{ width: "40%" }}><span>Vista Previa</span></div>
                    <div className="rowItem" style={{ width: "25%" }}><span>Editar</span></div>
                </div>
                {professionals?.map((prof) => RenderProfessionalRow(prof))}
            </div>
            <div className="addSection">
                <ProfessionalModal professional={{} as Professional} customTrigger={
                    <button className="newProfButton">
                        <AddIcon />
                    </button>
                } />
            </div>
        </div>
    )
}

export default Professionals