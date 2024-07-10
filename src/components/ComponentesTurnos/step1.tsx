import { useEffect } from 'react';
import { CircularProgress } from '@mui/material';
import { useAppointment } from '../../context/ApContext';
import { useConfig } from '../../context/AdminContext';
import ProfessionalCard from './Professional/ProfessionalCard';

const Step1 = () => {
    const { config, professionals, fetchProfessionals } = useConfig()
    const { form } = useAppointment()
    useEffect(() => {
        fetchProfessionals()
        //eslint-disable-next-line
    }, [])
    if (!config) return <></>

    return (
        <div>
            <div className="appointTitle" style={{ color: `${config.customization.primary.text}` }}>
                Elegí a tu <span>profesional</span>
            </div>
            <div className="container_Professional_Service">
                {professionals?.length ?
                    professionals.filter((e) => e.typesOfServices.some(ser => ser._id === form.typeOfService)).map((prof, index) => (
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