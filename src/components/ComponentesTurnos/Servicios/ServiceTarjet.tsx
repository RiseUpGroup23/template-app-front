import hexToRgb from "../../../modules/hexToRgb";
import { useConfig } from "../../../context/AdminContext";
import { useAppointment } from "../../../context/ApContext";
import { useStepContext } from "../../../context/StepContext";
import { TypeOfService } from "../../../typings/TypeOfServices";

interface ServiceTarjetProps {
    servicio: TypeOfService;
}

const ServiceTarjet: React.FC<ServiceTarjetProps> = ({ servicio }) => {

    const { config } = useConfig()
    const { nextStep } = useStepContext()
    const { setForm } = useAppointment()

    if (!config) return <></>

    const handleClick = () => {
        nextStep();
        setForm(prev => ({
            ...prev,
            typeOfService: servicio._id
        }))
    }

    return (
        <div className="tarjetaServicio" style={{ backgroundColor: `${hexToRgb(config.customization.primary.color)}` }} onClick={handleClick}>
            <div className="imgCard" style={{ background: `url(${servicio.image}) center/cover no-repeat` }}>
            </div>
            <div className="nombreServicio" style={{ color: `${config.customization.primary.text}` }}>
                {servicio.name}
            </div>
        </div>
    )
}

export default ServiceTarjet;