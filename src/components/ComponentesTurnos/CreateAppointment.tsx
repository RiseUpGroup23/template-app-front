import React, { useState } from 'react';
import StepButtons from './buttonsStep';
import { AppointmentProvider } from '../../context/ApContext';
import { StepProvider, useStepContext } from '../../context/StepContext';
import { Step0, Step1, Step2, Step3, Step4 } from './indexAppointments';
import { useConfig } from '../../context/AdminContext';

const CreateAppointment = () => {
    return (
        <AppointmentProvider>
            <StepProvider>
                <CreandoTurnos />
            </StepProvider>
        </AppointmentProvider>
    );
};

const CreandoTurnos = () => {
    const { currentStep } = useStepContext();
    const [nextButtonEnabled, setNextButtonEnabled] = useState<boolean>(false);
    const {config}=useConfig()

    const buttonTexts = [
        { prev: 'Inicio' },
        { prev: 'Anterior' },
        { prev: 'Anterior', next: 'Continuar' },
        { prev: 'Anterior', next: 'Continuar' },
        { prev: 'Anterior', next: config?.appointment.mercadoPago?'Ir a Pagar':"Confirmar" },
        // { prev: '', next: 'Ir a Inicio' }
    ];

    return (
        <div>
            <div className="containerStep">
                {currentStep === 0 && <Step0 />}
                {currentStep === 1 && <Step1 />}
                {currentStep === 2 && <Step2 setIsFormComplete={setNextButtonEnabled} />}
                {currentStep === 3 && (
                    <Step3 setNextButtonEnabled={setNextButtonEnabled} />
                )}
                {currentStep === 4 && <Step4 />}
                {/* {currentStep === 5 && <Step5 />} */}
            </div>
            <StepButtons
                prevButtonText={buttonTexts[currentStep].prev}
                nextButtonText={buttonTexts[currentStep].next}
                isNextButtonEnabled={nextButtonEnabled}
            />
            
        </div>
    );
};

export default CreateAppointment;