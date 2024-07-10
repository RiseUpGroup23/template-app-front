import { useEffect, useState } from "react"
import Footer from "../../components/Footer/Footer"
import Header from "../../components/Header/Header"
import { useConfig } from "../../context/AdminContext"
import hexToRgb from "../../modules/hexToRgb"
import axios from "axios"
import { useNavigate, useParams } from "react-router-dom"
import CloseIcon from '@mui/icons-material/Close';
import CachedIcon from '@mui/icons-material/Cached';
import DeleteModal from "../../components/AdminComps/Buttons/DeleteModal"
import EditAppointment from "../../components/AdminComps/Buttons/EditAppointment"
import Overlay from "./Overlay"

const ReproDet = () => {
    const { config, dbUrl, cancelAppointment } = useConfig()
    const { id } = useParams()
    const [apo, setApo] = useState<any>()
    const navigate = useNavigate()

    useEffect(() => {
        axios(`${dbUrl}/appointments/${id}`).then((res) => {
            setApo(res.data)
        })
    }, [dbUrl, id])

    if (!config || !apo) return (<></>)
    return (
        <Overlay image={`${config.customization.background.backgroundTurno}`}>
            <Header />
            <div className="containerRepro">
                <div className="appointTitle" style={{ color: `${config.customization.primary.text}`, marginLeft: '0px' }}><span>{apo.disabled ? "Se canceló el turno" : "Datos del turno"}</span></div>
                <div className="resumeContainer">
                    <div className="title">
                        <div style={{ color: `${config.customization.primary.text}` }}>
                            Fecha: <span style={{ fontWeight: "bold" }}>
                                {new Date(apo.date).getDate().toString().padStart(2, '0') + '-' +
                                    (new Date(apo.date).getMonth() + 1).toString().padStart(2, '0') + '-' +
                                    new Date(apo.date).getFullYear()}
                            </span>
                        </div>

                        <div style={{ color: `${config.customization.primary.text}`, marginTop: "15%" }}>
                            Hora: <span style={{ fontWeight: "bold" }}>{new Date(apo.date).toLocaleTimeString([], { hour: '2-digit', minute: '2-digit', hour12: false })}</span>
                        </div>
                    </div>
                    {!apo.disabled ?
                        <div className="resumeInfo" style={{ color: `${config.customization.primary.text}`, backgroundColor: `${hexToRgb(config.customization.primary.color, .7)}`, marginBottom: '-120px' }}>
                            Recordá que solo podés cancelar o cambiar el turno 24 horas antes del mismo.
                        </div>
                        :
                        <div className="canceledImage">
                            <img src="/canceled.png" alt="cancelado" />
                        </div>
                    }
                </div>
                <div className={"appointBoxButtons" + (!apo.disabled ? " toDisable" : "")}>
                    <button className='prev' onClick={() => {
                        if (apo.disabled) {
                            return navigate("/")
                        }
                        localStorage.setItem("searchedPhoneNumber", apo.customer.phoneNumber)
                        navigate("/reprogramar")
                    }}>
                        <svg width="14" height="24" viewBox="0 0 14 24" fill="none" xmlns="http://www.w3.org/2000/svg">
                            <path d="M0.936702 13.058C0.352378 12.4707 0.354745 11.521 0.941991 10.9366L10.5117 1.41453C11.0989 0.830209 12.0487 0.832577 12.633 1.41982C13.2173 2.00707 13.215 2.95681 12.6277 3.54114L4.12132 12.0052L12.5854 20.5116C13.1697 21.0989 13.1674 22.0486 12.5801 22.633C11.9929 23.2173 11.0431 23.2149 10.4588 22.6277L0.936702 13.058ZM2.99626 13.5024L1.99626 13.4999L2.00374 10.5L3.00374 10.5024L2.99626 13.5024Z" fill="black" fillOpacity="0.7" />
                        </svg>
                        Volver
                    </button>
                    {!apo.disabled && <div className="reproButtons">
                        <EditAppointment id={apo._id} customTrigger={
                            <div className={`next`} style={{ backgroundColor: `${hexToRgb(config.customization.primary.color)}`, color: `${config.customization.primary.text}` }}>
                                Cambiar turno
                                <CachedIcon />
                            </div>
                        } />
                        <DeleteModal
                            message="¿Está seguro que desea cancelar el turno?"
                            customTrigger={
                                <button className={`next`} style={{ backgroundColor: `${hexToRgb(config.customization.primary.color)}`, color: `${config.customization.primary.text}` }}>
                                    Cancelar turno
                                    <CloseIcon />
                                </button>
                            }
                            action={() => cancelAppointment(apo._id).then(() => {
                                window.location.reload()
                            })}
                        />
                    </div>}
                </div>
            </div>
            <Footer />
        </Overlay>
    )
}

export default ReproDet