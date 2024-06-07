import React, { useState } from 'react';
import { StepProvider, useStepContext } from '../../context/StepContext';
import { Step0, Step1, Step2, Step3, Step4, Step5 } from '../ComponentesTurnos/indexTurnos';
import StepButtons from './buttonsStep';
import { AppointmentProvider } from '../../context/ApContext';
import { useForm } from '../../context/FormContext';

const CrearTurno = () => {
    return (
        <StepProvider>
            <CreandoTurnos />
        </StepProvider>
    );
};

const CreandoTurnos = () => {
    const { currentStep } = useStepContext();
    const [isFormComplete, setIsFormComplete] = useState<boolean>(false);
    const { formData } = useForm();

    const buttonTexts = [
        { prev: 'Inicio', next: 'Continuar' },
        { prev: 'Anterior', next: 'Continuar' },
        { prev: 'Anterior', next: 'Continuar' },
        { prev: 'Anterior', next: 'Continuar' },
        { prev: 'Anterior', next: 'Ir a Pagar' },
        { prev: '', next: 'Ir a Inicio' }
    ];

    return (
        <div>
            <div className="containerStep">
                {currentStep === 0 && <Step0 />}
                {currentStep === 1 && <Step1 />}
                {currentStep === 2 && <Step2 setIsFormComplete={setIsFormComplete} />}
                {currentStep === 3 && (
                    <AppointmentProvider>
                        <Step3 />
                    </AppointmentProvider>
                )}
                {currentStep === 4 && <Step4 />}
                {currentStep === 5 && <Step5 />}
            </div>
            <StepButtons
                prevButtonText={buttonTexts[currentStep].prev}
                nextButtonText={buttonTexts[currentStep].next}
                isNextButtonEnabled={currentStep !== 2 || isFormComplete}
            />
        </div>
    );
};

export default CrearTurno;
