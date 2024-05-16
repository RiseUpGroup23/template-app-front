import { useConfig } from '../../context/AdminContext';
import './styleTurnos.css';

const Step4 = () => {
    const { config } = useConfig()
    if (!config) return <></>

    return (
        <div>
            <div className="appointTitle" style={{ color: `${config.customization.primary.text}` }}>Turno <span>Confirmado</span></div>
            <div className="resumeContainer">
                <div className="resumeText">
                    <div style={{ color: `${config.customization.primary.text}` }}>Fecha: <span style={{ fontWeight: "bold" }}>09-11-2001</span></div>
                    <div style={{ color: `${config.customization.primary.text}`, marginTop: "15%" }}>Hora: <span style={{ fontWeight: "bold" }}>20:45 Hs.</span></div>
                </div>
                <div className="resumeInfo" style={{ color: `${config.customization.primary.text}` }}>
                    Recordá llegar 10 minutos antes del horario reservado para evitar inconvenientes.
                </div>
            </div>
        </div>
    )
}

export default Step4;