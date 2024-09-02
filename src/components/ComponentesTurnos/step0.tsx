import { useMemo } from 'react';
import ServiceCard from './Service/ServiceCard';
import { useConfig } from '../../context/AdminContext';
import CircularProgress from '@mui/material/CircularProgress';

const Step0 = () => {
    const { config, services, professionals } = useConfig()

    const visibleCards = useMemo(() => {
        return services?.filter((service) => !service.disabled && professionals?.some((prof) => !prof.disabled && prof.typesOfServices.some((e) => e._id === service._id))) ?? []
    }, [services, professionals])

    if (!config) return <></>

    return (
        <div>
            <div className="appointTitle" style={{ color: `${config.customization.primary.text}` }}>
                Elegí que <span>servicio necesitas</span>
            </div>
            <div className="container_Professional_Service">
                {services?.length && professionals?.length ?
                    visibleCards.map((service, index) => (
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