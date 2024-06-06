import { useConfig } from "../../../context/AdminContext";
import hexToRgb from "../../../modules/hexToRgb";


interface TarjetaPeluqueroProps {
    nombre: string;
    imagen: string;
}

const TarjetaPeluquero: React.FC<TarjetaPeluqueroProps> = ({ nombre, imagen }) => {
    const { config, invertColors } = useConfig()
    if (!config) return <></>
    return (
        <div className="tarjeta" style={{ backgroundColor: `${hexToRgb(config.customization.primary.color)}` }}>
            <span className="tarjet">
                <img
                    src={imagen}
                />
                <div className="nombrePeluquero">
                    {nombre}
                </div>
            </span>
        </div>
    )
}

export default TarjetaPeluquero;