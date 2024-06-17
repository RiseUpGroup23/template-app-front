import React, { ChangeEvent, useEffect } from 'react';
import { useConfig } from '../../context/AdminContext';
import { useForm } from '../../context/FormContext';
import hexToRgb from '../../modules/hexToRgb';

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
            <div className='containerForm'>
                <div className='formulario' style={{ backgroundColor: `${hexToRgb(config.customization.primary.color)}` }}>
                    <style>
                        {`
                            .input::placeholder {
                                color: ${config.customization.primary.text} ;/* Cambia esto al color deseado */
                                opacity: 1;   /* Para asegurarte de que el color sea visible en todos los navegadores */
                            }
                        `}
                    </style>

                    <input type="text" name='name' className='input' placeholder='Nombre y apellido' value={nombre} onChange={handleNombreChange} style={{ color: `${config.customization.primary.text}` }}/>
                    <input type="number" name='cel' className='input' placeholder='Número de teléfono' value={celular} onChange={handleCelularChange} style={{ color: `${config.customization.primary.text}`}} />

                    <span className='oblig' style={{ color: `${config.customization.primary.text}`}}>Estos datos son obligatorios</span>
                </div>
            </div>
        </div>
    );
}

export default Step2;