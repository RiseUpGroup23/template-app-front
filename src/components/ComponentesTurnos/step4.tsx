import { useConfig } from '../../context/AdminContext';
import './styleTurnos.css';
import hexToRgb from "../../modules/hexToRgb";
import { useAppointment } from '../../context/ApContext';


const Step4 = () => {
    const { config } = useConfig()
    const { form } = useAppointment()

    if (!config) return <></>

    return (
        <div >
            <div className="appointTitle" style={{ color: `${config.customization.primary.text}`, marginLeft: '0px' }}>Resumen de la <span>Reserva</span></div>
            <div className="resumeContainer">
                <div className="resumeText">
                    <div style={{ color: `${config.customization.primary.text}` }}>
                        Fecha: <span style={{ fontWeight: "bold" }}>
                            {new Date(form.date).getDate().toString().padStart(2, '0') + '-' +
                                (new Date(form.date).getMonth() + 1).toString().padStart(2, '0') + '-' +
                                new Date(form.date).getFullYear()}
                        </span>
                    </div>

                    <div style={{ color: `${config.customization.primary.text}`, marginTop: "15%" }}>
                        Hora: <span style={{ fontWeight: "bold" }}>{new Date(form.date).toLocaleTimeString([], { hour: '2-digit', minute: '2-digit', hour12: false })}</span>
                    </div>
                </div>
                <div className="resumeInfo" style={{ color: `${config.customization.primary.text}`, backgroundColor: `${hexToRgb(config.customization.primary.color, 1)}`, marginBottom: '-120px' }}>
                    Recordá llegar 10 minutos antes del horario reservado para evitar inconvenientes.
                </div>
            </div>
        </div>
    )
}

export default Step4;