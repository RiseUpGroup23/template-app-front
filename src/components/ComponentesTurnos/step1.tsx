import { useEffect } from 'react';
import { useConfig } from '../../context/AdminContext';
import TarjetaPeluquero from './Peluqueros/tarjetaPeluquero';

const Step1 = () => {
    const { config, professionals, fetchProfessionals } = useConfig()
    useEffect(()=>{
        fetchProfessionals()
        
    },[])
    if (!config) return <></>

    return (
        <div>
            <div className="appointTitle" style={{ color: `${config.customization.primary.text}` }}>
                Elegí a tu <span>peluquero/a</span>
            </div>
            <div className="containerPeluqueros">
                {professionals?.map((prof, index) => (
                    <TarjetaPeluquero key={index} prof={prof} />
                ))}
            </div>
        </div>
    )
}

export default Step1;