import { useEffect, useState } from "react"
import Footer from "../../components/Footer/Footer"
import Header from "../../components/Header/Header"
import { useConfig } from "../../context/AdminContext"
import hexToRgb from "../../modules/hexToRgb"
import Overlay from "../Turnos/Overlay"
import { useAppointment } from '../../context/ApContext';
import HomeIcon from '@mui/icons-material/Home';

const TurnoRechazado = () => {
    const { config } = useConfig()
    const { form } = useAppointment()

    if (!config) return <></>

    const GoToHome = () => {
        window.location.href = "/";
    };

    return (
        <Overlay image={`${config.customization.background.backgroundTurno}`}>
            <Header />
            <div className="containerRepro">
                <div className="appointTitle" style={{ color: `${config.customization.primary.text}`, marginLeft: '0px' }}>Turno <span>Rechazado</span></div>
                <div className="resumeContainer">
                    <div className="title">
                        <div style={{ color: `${config.customization.primary.text}` }}>
                            Fecha: <span style={{ fontWeight: "bold" }}>
                                {new Date(form.date).getDate().toString().padStart(2, '0') + '-' +
                                    (new Date(form.date).getMonth() + 1).toString().padStart(2, '0') + '-' +
                                    new Date(form.date).getFullYear()}
                            </span>
                        </div>

                        <div style={{ color: `${config.customization.primary.text}` }} className='hora'>
                            Hora: <span style={{ fontWeight: "bold" }}>{new Date(form.date).toLocaleTimeString([], { hour: '2-digit', minute: '2-digit', hour12: false })}</span>
                        </div>
                    </div>
                    <div className="canceledImage" style={{ marginTop: "-120px", justifyContent: "flex-end", marginRight: "100px" }}>
                        <img src="/canceled.png" alt="cancelado" />
                    </div>
                </div>
                <div style={{ display: "flex", justifyContent: "flex-end", marginRight: "100px" }} className="botonConfirmado">
                    <button style={{ color: `${config.customization.primary.text}`, backgroundColor: `${hexToRgb(config.customization.primary.color, 1)}` }} className="next" onClick={GoToHome}>
                        Ir a Inicio <HomeIcon />
                    </button>
                </div>
            </div>
            <Footer />
        </Overlay>
    )
}

export default TurnoRechazado