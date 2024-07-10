import React, { ChangeEvent, useEffect } from 'react';
import hexToRgb from '../../modules/hexToRgb';
import { useConfig } from '../../context/AdminContext';
import { useAppointment } from '../../context/ApContext';

interface Step2Props {
    setIsFormComplete: (value: boolean) => void;
}

const Step2: React.FC<Step2Props> = ({ setIsFormComplete }) => {
    const { form, setForm } = useAppointment();
    const { customer: { name, phoneNumber } } = form;

    const handleNameChange = (e: ChangeEvent<HTMLInputElement>) => {
        const value = e.target.value;
        if (/^[a-zA-Z\s]*$/.test(value)) {
            setForm((prevData: any) => ({
                ...prevData, customer: {
                    ...prevData.customer,
                    name: value
                }
            }));
        }
    };

    const handlePhoneChange = (e: ChangeEvent<HTMLInputElement>) => {
        const value = e.target.value;
        if (/^\d*$/.test(value)) {
            setForm((prevData: any) => ({
                ...prevData, customer: {
                    ...prevData.customer,
                    phoneNumber: value
                }
            }));
        }
    };

    useEffect(() => {
        setIsFormComplete(name !== "" && phoneNumber.length > 8);
    }, [name, phoneNumber, setIsFormComplete]);

    const { config } = useConfig();
    if (!config) return <></>;

    return (
        <div>
            <div className="appointTitle" style={{ color: `${config.customization.primary.text}` }}>
                Llena el <span>formulario</span> con <span>tus datos</span>
            </div>
            <div className='containerForm'>
                <div className='form' style={{ backgroundColor: `${hexToRgb(config.customization.primary.color)}` }}>
                    <style>
                        {`
                            .input::placeholder {
                                color: ${config.customization.primary.text}; /* Cambia esto al color deseado */
                                opacity: 1;   /* Para asegurarte de que el color sea visible en todos los navegadores */
                            }
                        `}
                    </style>

                    <input autoComplete="off" type="text" name='name' className='input' placeholder='Nombre y apellido' value={name} onChange={handleNameChange} style={{ color: `${config.customization.primary.text}` }} />
                    <input type="number" name='cel' className='input' placeholder='Número de teléfono' value={phoneNumber} onChange={handlePhoneChange} style={{ color: `${config.customization.primary.text}` }} />

                    <span className='oblig' style={{ color: `${config.customization.primary.text}` }}>Estos datos son obligatorios</span>
                </div>
            </div>
        </div>
    );
}

export default Step2;