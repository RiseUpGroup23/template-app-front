import { useConfig } from "../../../context/AdminContext";
import hexToRgb from "../../../modules/hexToRgb";

interface TarjetaPeluqueroProps {
    nombre: string;
    imagen: string;
    tipo: string;
}

const TarjetaPeluquero: React.FC<TarjetaPeluqueroProps> = ({ nombre, imagen, tipo }) => {

    const { config } = useConfig()
    if (!config) return <></>

    return (
        <div className="tarjeta" style={{ backgroundColor: `${hexToRgb(config.customization.primary.color)}` }}>
                <img
                    src={imagen}
                    className="imgPeluquero"
                />
                <div className="nombrePeluquero" style={{ color: `${config.customization.primary.text}` }}>
                    {nombre}
                </div>
                <div className="tipoPeluquero" style={{ color: `${config.customization.primary.text}` }}>
                    {tipo}
                </div>
        </div>
    )
}

export default TarjetaPeluquero;