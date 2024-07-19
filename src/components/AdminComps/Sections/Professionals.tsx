import React, { useEffect, useState } from "react"
import { useConfig } from "../../../context/AdminContext"
import { RenderBanRow, RenderProfessionalRow } from "../Rows/rows"
import AddIcon from '@mui/icons-material/Add';
import ProfessionalModal from "../Buttons/ProfessionalModal";
import { Professional } from "../../../typings/Professional";
import { CircularProgress } from "@mui/material";
import BansModal from "../Buttons/BansModal";
import { BannedDay } from "../../../typings/ConfigFile";
import { arrowIco } from "./MainEditor";

const Professionals = () => {
    const { newConfig, professionals, fetchProfessionals, fetchServices } = useConfig()
    const pageStep = 4
    const [visibleItems, setVisibleItems] = useState(pageStep);
    const [loading, setLoading] = useState(true)

    useEffect(() => {
        fetchProfessionals().then(() => {
            setLoading(false)
        })
        fetchServices()
        //eslint-disable-next-line
    }, [])

    const handleSeeMore = () => {
        setVisibleItems(prevVisibleItems => prevVisibleItems + pageStep);
    };

    if (!newConfig) return (<></>)

    return (
        <div className="mainContainer">
            <span className="initialTitle">¡Hola, <strong>{newConfig.customization.shopName}!</strong></span>
            <span className="proxApo">
                Editar excepciones
            </span>
            <div className="blackLayout">
                <div className="proxApoHeader rowContainer">
                    <div className="rowItem" style={{ width: "35%" }}><span>Fecha</span></div>
                    <div className="rowItem" style={{ width: "40%" }}><span>Nombre</span></div>
                    <div className="rowItem" style={{ width: "25%" }}><span>Editar</span></div>
                </div>
                {
                    newConfig.appointment.bannedDays.length ?
                        newConfig.appointment.bannedDays.slice(0, visibleItems).map((e, index) => RenderBanRow(e, index))
                        :
                        <div className="noData">
                            No hay excepciones configuradas
                        </div>
                }
            </div>
            <div className="addSection">
                {newConfig?.appointment?.bannedDays?.length > visibleItems && (
                    <button className="seeAllButton" onClick={handleSeeMore}>
                        Ver más
                        {arrowIco(0)}
                    </button>
                )}
                <BansModal ban={{} as BannedDay} customTrigger={
                    <button className="newProfButton">
                        <AddIcon />
                    </button>
                } />
            </div>
            <span className="proxApo">
                Editar profesionales
            </span>
            <div className="blackLayout">
                {!loading ?
                    <>
                        <div className="proxApoHeader rowContainer">
                            <div className="rowItem" style={{ width: "35%" }}><span>Nombre</span></div>
                            <div className="rowItem" style={{ width: "40%" }}><span>Vista Previa</span></div>
                            <div className="rowItem" style={{ width: "25%" }}><span>Editar</span></div>
                        </div>
                        {professionals?.length ?
                            professionals?.map((prof) => RenderProfessionalRow(prof))
                            :
                            <div className="noData">
                                No hay profesionales configurados
                            </div>
                        }
                    </>
                    :
                    <div className="blackLayLoading">
                        <CircularProgress size={50} sx={{ color: "white" }} />
                    </div>
                }
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