import { useEffect } from 'react';
import ServiceCard from './Service/ServiceCard';
import { useConfig } from '../../context/AdminContext';
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
            <div className="container_Professional_Service">
                {services?.length?
                    services.map((service, index) => (
                        <ServiceCard key={index} servicio={service} />
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