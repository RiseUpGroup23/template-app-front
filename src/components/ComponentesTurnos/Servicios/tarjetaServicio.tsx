import { useConfig } from "../../../context/AdminContext";
import hexToRgb from "../../../modules/hexToRgb";
import { useStepContext } from "../../../context/StepContext";
import { useAppointment } from "../../../context/ApContext";
import { TypeOfService } from "../../../typings/TypeOfServices";

interface TarjetaServicioProps {
    servicio: TypeOfService;
}

const TarjetaServicio: React.FC<TarjetaServicioProps> = ({ servicio }) => {

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
            <img
                src={servicio.image}
                className="imgServicio"
            />
            <div className="nombreServicio" style={{ color: `${config.customization.primary.text}` }}>
                {servicio.name}
            </div>
        </div>
    )
}

export default TarjetaServicio;