import { useEffect, useMemo } from 'react';
import ServiceCard from './Service/ServiceCard';
import { useConfig } from '../../context/AdminContext';
import CircularProgress from '@mui/material/CircularProgress';
import { useStepContext } from '../../context/StepContext';
import { useAppointment } from '../../context/ApContext';

const Step0 = () => {
    const { config, services, fetchServices, professionals, fetchProfessionals } = useConfig()
    const { nextStep, previous, prevStep } = useStepContext()
    const { setForm } = useAppointment()

    const visibleCards = useMemo(() => {
        return services?.filter((service) => professionals?.some((prof) => prof.typesOfServices.some((e) => e._id === service._id))) ?? []
    }, [services, professionals])

    useEffect(() => {
        !services?.length && fetchServices()
        !professionals?.length && fetchProfessionals()
        //eslint-disable-next-line
    }, [])

    useEffect(() => {
        if (visibleCards?.length === 1) {
            if (previous < 1) {
                setForm(prev => ({
                    ...prev,
                    typeOfService: visibleCards[0]._id
                }))
                nextStep(1)
            } else {
                prevStep(0)
            }
        }
        //eslint-disable-next-line
    }, [visibleCards])

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