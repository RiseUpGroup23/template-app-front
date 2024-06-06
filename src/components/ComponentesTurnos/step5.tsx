import { useConfig } from '../../context/AdminContext';
import './styleTurnos.css';
import hexToRgb from "../../modules/hexToRgb";

const Step5 = () => {
    const { config } = useConfig()
    if (!config) return <></>

    return (
        <div>
            <div className="appointTitle" style={{ color: `${config.customization.primary.text}`, marginLeft: '0px' }}>Turno <span>Confirmado</span></div>
            <div className="resumeContainer">
                <div className="resumeText">
                    <div style={{ color: `${config.customization.primary.text}`}}>Fecha: <span style={{ fontWeight: "bold" }}>09-11-2001</span></div>
                    <div style={{ color: `${config.customization.primary.text}`, marginTop: "15%"}}>Hora: <span style={{ fontWeight: "bold" }}>20:45 Hs.</span></div>
                </div>
                <div className="resumeInfo" style={{ color: `${config.customization.primary.text}`, backgroundColor: `${hexToRgb(config.customization.primary.color, 1)}`, marginBottom: '-120px' }}>
                    Recordá llegar 10 minutos antes del horario reservado para evitar inconvenientes.
                </div>
            </div>
        </div>
    )
}

export default Step5;