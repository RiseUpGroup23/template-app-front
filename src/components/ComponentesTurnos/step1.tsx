// Elegir servicio
import { useConfig } from '../../context/AdminContext';

const Step1 = () => {
    const { config } = useConfig()
    if (!config) return <></>

    return (
        <div>
            <div className="appointTitle" style={{ color: `${config.customization.primary.text}` }}>
                Elegí el <span>servicio</span> que necesites
            </div>
        </div>
    )
}

export default Step1;