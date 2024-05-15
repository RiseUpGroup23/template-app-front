import React from 'react';
import { useConfig } from "../../context/AdminContext";

interface TurnosHeaderProps {
    step: number;
}

interface StepTexts {
    [key: number]: { text1: string; text2: string };
}

const TurnosHeader: React.FC<TurnosHeaderProps> = ({ step }) => {
    const { config } = useConfig();
    if (!config) return <></>;

    // Definir los textos para cada paso
    const stepTexts: StepTexts = {
        0: { text1: 'Llena este', text2: 'Formulario' },
        1: { text1: 'Elegí tu', text2: 'Peluquero' },
        2: { text1: 'Reserva tu', text2: 'Turno' },
        3: { text1: 'Confirma tus', text2: 'Datos y Reserva' },
        4: { text1: 'Turno', text2: 'Reservado' },
    };

    // Obtener los textos correspondientes al paso actual
    const { text1, text2 } = stepTexts[step] || {};

    return (
        <div>
            <span className="Text" style={{ color: `${config.customization.primary.text}` }}>
                {text1} <span style={{ fontWeight: "500" }}>{text2}</span>
            </span>
        </div>
    );
};

export default TurnosHeader;
