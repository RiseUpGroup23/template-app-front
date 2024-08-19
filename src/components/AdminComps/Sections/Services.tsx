import React, { useEffect, useState } from "react"
import { useConfig } from "../../../context/AdminContext"
import AddIcon from '@mui/icons-material/Add';
import { RenderServiceRow } from "../Rows/rows"
import ServiceModal from "../Modals/ServiceModal";
import { TypeOfService } from "../../../typings/TypeOfServices";
import { CircularProgress } from "@mui/material";

const Services = () => {
    const { fetchServices, services, newConfig } = useConfig()
    const [loading, setLoading] = useState(true)

    useEffect(() => {
        fetchServices().then(() => {
            setLoading(false)
        })
        //eslint-disable-next-line
    }, [])

    if (!newConfig) return (<></>)

    return (
        <div className="mainContainer">
            <span className="initialTitle">¡Hola, <strong>{newConfig.customization.shopName}!</strong></span>
            <span className="proxApo">
                Editar servicios
            </span>
            <div className="blackLayout">
                {!loading ?
                    <>
                        <div className="proxApoHeader rowContainer">
                            <div className="rowItem" style={{ width: "35%" }}><span>Nombre</span></div>
                            <div className="rowItem" style={{ width: "40%" }}><span>Vista Previa</span></div>
                            <div className="rowItem" style={{ width: "25%" }}><span>Editar</span></div>
                        </div>
                        {services?.length ?
                            services.map((service) => RenderServiceRow(service))
                            :
                            <div className="noData">
                                No hay servicios configurados
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
                <ServiceModal service={{} as TypeOfService} customTrigger={
                    <button className="newProfButton">
                        <AddIcon />
                    </button>
                } />
            </div>
        </div>
    )
}

export default Services