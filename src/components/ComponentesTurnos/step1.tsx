import { useEffect } from 'react';
import { CircularProgress } from '@mui/material';
import { useConfig } from '../../context/AdminContext';
import ProfessionalTarjet from './Peluqueros/ProfessionalTarjet';

const Step1 = () => {
    const { config, professionals, fetchProfessionals } = useConfig()
    useEffect(() => {
        fetchProfessionals()
        //eslint-disable-next-line
    }, [])
    if (!config) return <></>

    return (
        <div>
            <div className="appointTitle" style={{ color: `${config.customization.primary.text}` }}>
                Elegí a tu <span>peluquero/a</span>
            </div>
            <div className="containerPeluqueros">
                {professionals?.length ?
                    professionals.map((prof, index) => (
                        <ProfessionalTarjet key={index} prof={prof} />
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