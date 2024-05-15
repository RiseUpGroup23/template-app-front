import React from 'react';
import { StepProvider, useStepContext } from '../../context/StepContext';
import { Step0, Step1, Step2, Step3, Step4 } from '../ComponentesTurnos/indexTurnos';
import StepButtons from './buttonsStep';
import TurnosHeader from './TurnosHeader';

const CrearTurno = () => {
    return (
        <StepProvider>
            <CreandoTurnos />
        </StepProvider>
    );
};

const CreandoTurnos = () => {
    const { currentStep } = useStepContext();

    const buttonTexts = [
        { prev: 'Inicio', next: 'Continuar' },
        { prev: 'Anterior', next: 'Continuar' },
        { prev: 'Anterior', next: 'Continuar' },
        { prev: 'Anterior', next: 'Ir a Pagar' },
        { prev: 'Anterior', next: 'Ir a Inicio' }
    ];

    return (
        <div>
            <TurnosHeader step={currentStep} />
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
