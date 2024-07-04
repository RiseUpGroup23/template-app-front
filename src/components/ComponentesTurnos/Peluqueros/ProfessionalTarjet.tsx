import hexToRgb from "../../../modules/hexToRgb";
import { useConfig } from "../../../context/AdminContext";
import { useAppointment } from "../../../context/ApContext";
import { Professional } from "../../../typings/Professional";
import { useStepContext } from "../../../context/StepContext";

interface ProfessionalTarjetProps {
    prof: Professional
}

const ProfessionalTarjet: React.FC<ProfessionalTarjetProps> = ({ prof }) => {

    const { config } = useConfig()
    const { nextStep } = useStepContext()
    const { setForm } = useAppointment()
    if (!config) return <></>

    const handleClick = () => {
        nextStep();
        setForm(prev => ({
            ...prev,
            professional: prof._id
        }))
    }

    return (
        <div className="tarjeta" style={{ backgroundColor: `${hexToRgb(config.customization.primary.color)}` }} onClick={handleClick}>
            <div className="imgCard" style={{ background: `url(${prof.image}) center/cover no-repeat` }}>
            </div>
            <div className="nombrePeluquero" style={{ color: `${config.customization.primary.text}` }}>
                {prof.name}
            </div>
            <div className="tipoPeluquero" style={{ color: `${config.customization.primary.text}` }}>
                {prof.profession}
            </div>
        </div>
    )
}

export default ProfessionalTarjet;