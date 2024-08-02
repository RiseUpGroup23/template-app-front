import Overlay from "../Turnos/Overlay";
import Header from "../../components/Header/Header";
import Footer from "../../components/Footer/Footer";
import hexToRgb from "../../modules/hexToRgb";
import { useConfig } from '../../context/AdminContext';
import { useAppointment } from '../../context/ApContext';
import HomeIcon from '@mui/icons-material/Home';

const Confirmado = () => {
    const { config } = useConfig()
    const { form } = useAppointment()
    if (!config) return <></>

    const GoToHome = () => {
        window.location.href = "/";
    };

    return (
        <Overlay image={`${config.customization.background.backgroundTurno}`}>
            <Header />
            <div className="containerStep">
                <div>
                    <div className="appointTitle" style={{ color: `${config.customization.primary.text}`, marginLeft: '0px' }}>Turno <span>Confirmado</span></div>
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
                        <div className="resumeInfo" style={{ color: `${config.customization.primary.text}`, backgroundColor: `${hexToRgb(config.customization.primary.color, 1)}`, marginBottom: '-120px' }}>
                            Recordá llegar 10 minutos antes del horario reservado para evitar inconvenientes.
                        </div>
                    </div>
                    <div style={{display: "flex", justifyContent: "flex-end"}} className="botonConfirmado">
                        <button style={{ color: `${config.customization.primary.text}`, backgroundColor: `${hexToRgb(config.customization.primary.color, 1)}`}} className="next" onClick={GoToHome}>
                            Ir a Inicio <HomeIcon/>
                        </button>
                    </div>
                </div>
            </div>
            <Footer />
        </Overlay>
    )
}

export default Confirmado;