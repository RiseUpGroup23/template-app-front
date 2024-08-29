import { useEffect, useState } from "react"
import { useConfig } from "../../../context/AdminContext"
import { RenderProfessionalRow } from "../Rows/rows"
import AddIcon from '@mui/icons-material/Add';
import ProfessionalModal from "../Modals/ProfessionalModal";
import { Professional } from "../../../typings/Professional";
import { CircularProgress } from "@mui/material";

const Professionals = () => {
    const { newConfig, professionals, fetchProfessionals, fetchServices } = useConfig()
    const [loading, setLoading] = useState(true)
    const [conflicts, setConflicts] = useState<any>({})

    useEffect(() => {
        fetchProfessionals().then(() => {
            setLoading(false)
        })
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
                {!loading ?
                    <>
                        <div className="proxApoHeader rowContainer">
                            <div className="rowItem" style={{ width: "35%" }}><span>Nombre</span></div>
                            <div className="rowItem" style={{ width: "40%" }}><span>Vista Previa</span></div>
                            <div className="rowItem" style={{ width: "25%" }}><span>Editar</span></div>
                        </div>
                        {professionals?.filter(prof => !prof.disabled)?.length ?
                            professionals?.filter(prof => !prof.disabled)?.map((prof) => RenderProfessionalRow(prof, conflicts, setConflicts))
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