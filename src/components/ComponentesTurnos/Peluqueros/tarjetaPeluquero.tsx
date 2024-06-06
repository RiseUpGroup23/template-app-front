import { useConfig } from "../../../context/AdminContext";
import hexToRgb from "../../../modules/hexToRgb";


interface TarjetaPeluqueroProps {
    nombre: string;
    imagen: string;
    tipo: string;
}

const TarjetaPeluquero: React.FC<TarjetaPeluqueroProps> = ({ nombre, imagen, tipo }) => {
    const { config, invertColors } = useConfig()
    if (!config) return <></>
    return (
        <div className="tarjeta" style={{ backgroundColor: `${hexToRgb(config.customization.primary.color)}` }}>
            <span className="tarjet">
                <img
                    src={imagen}
                />
                <div className="nombrePeluquero" style={{ color: `${config.customization.primary.text}` }}>
                    {nombre}
                </div>
                <div className="tipoPeluquero" style={{ color: `${config.customization.primary.text}` }}>
                    {tipo}
                </div>
            </span>
        </div>
    )
}

export default TarjetaPeluquero;