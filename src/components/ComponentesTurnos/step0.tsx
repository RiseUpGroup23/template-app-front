import { useEffect } from 'react';
import { useConfig } from '../../context/AdminContext';
import TarjetaServicio from './Servicios/tarjetaServicio';

const Step0 = () => {
    const { config, services, fetchServices } = useConfig()
    useEffect(() => {
        fetchServices()

    }, [])
    if (!config) return <></>

    return (
        <div>
            <div className="appointTitle" style={{ color: `${config.customization.primary.text}` }}>
                Elegí que <span>servicio necesitas</span>
            </div>
            <div className="containerPeluqueros">
                {services?.map((service, index) => (
                    <TarjetaServicio key={index} servicio={service} />
                ))}
            </div>
        </div>
    )
}

export default Step0;