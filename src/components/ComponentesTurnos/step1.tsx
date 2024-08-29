import { useEffect, useMemo } from 'react';
import { CircularProgress } from '@mui/material';
import { useAppointment } from '../../context/ApContext';
import { useConfig } from '../../context/AdminContext';
import ProfessionalCard from './Professional/ProfessionalCard';
import { useStepContext } from '../../context/StepContext';

const Step1 = () => {
    const { config, professionals, fetchProfessionals } = useConfig()
    const { form, setForm } = useAppointment()
    const { nextStep, previous, prevStep } = useStepContext()

    const visibleCards = useMemo(() => {
        return professionals?.filter((e) => !e.disabled && e.typesOfServices.some(ser => ser._id === form.typeOfService)) ?? []
        //eslint-disable-next-line
    }, [professionals])

    useEffect(() => {
        !professionals?.length && fetchProfessionals()
        //eslint-disable-next-line
    }, [])

    useEffect(() => {
        if (visibleCards?.length === 1) {
            if (previous < 2) {
                setForm(prev => ({
                    ...prev,
                    professional: visibleCards[0]._id
                }))
                nextStep(2)
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
                Elegí a tu <span>profesional</span>
            </div>
            <div className="container_Professional_Service">
                {professionals?.length ?
                    visibleCards?.map((prof, index) => (
                        <ProfessionalCard key={index} prof={prof} />
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

export default Step1;