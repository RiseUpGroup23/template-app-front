import { useConfig } from "../../../context/AdminContext";
import hexToRgb from "../../../modules/hexToRgb";

interface TarjetaServicioProps {
    servicio: string;
    imagen: string;
}

const TarjetaServicio: React.FC<TarjetaServicioProps> = ({ servicio, imagen }) => {

    const { config } = useConfig()
    if (!config) return <></>

    return (
        <div className="tarjetaServicio" style={{ backgroundColor: `${hexToRgb(config.customization.primary.color)}` }}>
            <img
                src={imagen}
                className="imgServicio"
            />
            <div className="nombreServicio" style={{ color: `${config.customization.primary.text}` }}>
                {servicio}
            </div>
        </div>
    )
}

export default TarjetaServicio;