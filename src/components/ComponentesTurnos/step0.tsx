import { useEffect } from 'react';
import { useConfig } from '../../context/AdminContext';
import TarjetaServicio from './Servicios/tarjetaServicio';
import CircularProgress from '@mui/material/CircularProgress';

const Step0 = () => {
    const { config, services, fetchServices } = useConfig()
    useEffect(() => {
        fetchServices()
        //eslint-disable-next-line
    }, [])
    if (!config) return <></>

    return (
        <div>
            <div className="appointTitle" style={{ color: `${config.customization.primary.text}` }}>
                Elegí que <span>servicio necesitas</span>
            </div>
            <div className="containerPeluqueros">
                {services?.length?
                    services.map((service, index) => (
                        <TarjetaServicio key={index} servicio={service} />
                    ))
                    :
                    <div className="cardsLoading">
                        <CircularProgress size={50} style={{ color: `${config.customization.primary.text}` }} />
                    </div>
                }
            </div>
        </div>
    )
}

export default Step0;