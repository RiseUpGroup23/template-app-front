import React, { ChangeEvent, useEffect } from 'react';
import { useConfig } from '../../context/AdminContext';
import { useForm } from '../../context/FormContext';

interface Step2Props {
    setIsFormComplete: (value: boolean) => void;
}

const Step2: React.FC<Step2Props> = ({ setIsFormComplete }) => {
    const { formData, setFormData } = useForm();
    const { nombre, celular } = formData;

    const handleNombreChange = (e: ChangeEvent<HTMLInputElement>) => {
        const value = e.target.value;
        setFormData(prevData => ({ ...prevData, nombre: value }));
    };

    const handleCelularChange = (e: ChangeEvent<HTMLInputElement>) => {
        const value = e.target.value;
        setFormData(prevData => ({ ...prevData, celular: value }));
    };

    useEffect(() => {
        setIsFormComplete(!!nombre && !!celular);
    }, [nombre, celular, setIsFormComplete]);

    const { config } = useConfig();
    if (!config) return <></>;

    return (
        <div>
            <div className="appointTitle" style={{ color: `${config.customization.primary.text}` }}>
                Llena el <span>formulario</span> con <span>tus datos</span>
            </div>
            <div className='formulario'>
                <div className='input-group'>
                    <input type="text" name='number' className='input' value={celular} onChange={handleCelularChange}/>
                    {/* <label className='label'>Número de teléfono</label> */}
                </div>
                <span style={{ color: "#FFFFFF", marginTop: "5%" }}>*Estos datos son obligatorios</span>
            </div>
        </div>
    );
}

export default Step2;