import React from 'react';
import { useStepContext } from '../../context/StepContext';
import { useLocation } from 'react-router-dom';

interface StepButtonsProps {
    prevButtonText: string;
    nextButtonText: string;
}

const StepButtons: React.FC<StepButtonsProps> = ({ prevButtonText, nextButtonText }) => {
    const { currentStep, nextStep, prevStep } = useStepContext();
    const location = useLocation(); // Obtener la ubicación actual

    // Función para redirigir a la ruta "/"
    const goToHome = () => {
        window.location.href = "/"; // Redirigir a la ruta "/"
    };

    return (
        <div>
            {currentStep === 0 && <button onClick={goToHome}>{prevButtonText}</button>}
            {currentStep > 0 && <button onClick={prevStep}>{prevButtonText}</button>}
            {currentStep < 4 && <button onClick={nextStep}>{nextButtonText}</button>}
            {currentStep === 4 && <button onClick={goToHome}>{nextButtonText}</button>}
        </div>
    );
};

export default StepButtons;
