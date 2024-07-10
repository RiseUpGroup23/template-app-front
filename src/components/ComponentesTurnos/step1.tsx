import { useEffect } from 'react';
import { useConfig } from '../../context/AdminContext';
import TarjetaPeluquero from './Peluqueros/tarjetaPeluquero';
import { CircularProgress } from '@mui/material';
import { useAppointment } from '../../context/ApContext';

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
            <div className="containerPeluqueros">
                {professionals?.length ?
                    professionals.filter((e) => e.typesOfServices.some(ser => ser._id === form.typeOfService)).map((prof, index) => (
                        <TarjetaPeluquero key={index} prof={prof} />
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