// Llenar Formulario
import { useConfig } from '../../context/AdminContext';

const Step2 = () => {
    const { config } = useConfig()
    if (!config) return <></>

    return (
        <div>
            <div className="appointTitle" style={{ color: `${config.customization.primary.text}` }}>
                Llena el <span>formulario</span> con <span>tus datos</span>
            </div>
        </div>
    )
}

export default Step2;