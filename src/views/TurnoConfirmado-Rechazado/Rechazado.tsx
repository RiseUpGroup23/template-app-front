import Footer from "../../components/Footer/Footer"
import Header from "../../components/Header/Header"
import { useConfig } from "../../context/AdminContext"
import hexToRgb from "../../modules/hexToRgb"
import Overlay from "../Turnos/Overlay"
import HomeIcon from '@mui/icons-material/Home';

const TurnoRechazado = () => {
    const { config } = useConfig()
    const appoData = localStorage.getItem("tryToReserve")
    const dateString = localStorage.getItem("tryToReserve") || new Date().toJSON()

    if (!config) return <></>

    const GoToHome = () => {
        window.location.href = "/";
    };

    return (
        <Overlay image={`${config.customization.background.backgroundTurno}`}>
            <Header />
            <div className="containerRepro">
                <div className="appointTitle" style={{ color: `${config.customization.primary.text}` }}>No se puedo <span>reservar </span>tu <span>turno</span></div>
                <div className="resumeContainer">
                    <div className="title" style={{ visibility: appoData ? "visible" : "hidden" }}>
                        <div style={{ color: `${config.customization.primary.text}` }}>
                            Fecha: <span style={{ fontWeight: "bold" }}>
                                {new Date(dateString).getDate().toString().padStart(2, '0') + '-' +
                                    (new Date(dateString).getMonth() + 1).toString().padStart(2, '0') + '-' +
                                    new Date(dateString).getFullYear()}
                            </span>
                        </div>

                        <div style={{ color: `${config.customization.primary.text}` }}>
                            Hora: <span style={{ fontWeight: "bold" }}>{dateString.split("T")[1].slice(0, 5)}</span>
                        </div>
                    </div>
                    <div className="canceledImage">
                        <img src="/canceled.png" alt="cancelado" />
                    </div>
                </div>
                <div className="appointBoxButtons">
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