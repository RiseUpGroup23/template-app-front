import React from 'react';
import { StepProvider, useStepContext } from '../../context/StepContext';
import { Step0, Step1, Step2, Step3, Step4 } from '../ComponentesTurnos/indexTurnos';
import StepButtons from './buttonsStep';

const CrearTurno = () => {
    return (
        <StepProvider>
            <TurnoFormulario />
        </StepProvider>
    );
};

const TurnoFormulario = () => {
    const { currentStep } = useStepContext();

    // Definir los textos de los botones para cada paso
    const buttonTexts = [
        { prev: 'Inicio', next: 'Siguiente' },
        { prev: 'Anterior', next: 'Siguiente' },
        { prev: 'Anterior', next: 'Siguiente' },
        { prev: 'Anterior', next: 'Siguiente' },
        { prev: 'Anterior', next: 'Ir a Inicio' }
    ];

    return (
        <div>
            <h1>CrearTurno</h1>
            <div className="containerStep">
                {currentStep === 0 && <Step0 />}
                {currentStep === 1 && <Step1 />}
                {currentStep === 2 && <Step2 />}
                {currentStep === 3 && <Step3 />}
                {currentStep === 4 && <Step4 />}
            </div>
            <StepButtons prevButtonText={buttonTexts[currentStep].prev} nextButtonText={buttonTexts[currentStep].next} />
        </div>
    );
};

export default CrearTurno;
