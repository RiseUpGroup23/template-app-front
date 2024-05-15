import React from 'react';
import { useStepContext } from '../../context/StepContext';
import './styleTurnos.css';

interface StepButtonsProps {
    prevButtonText: string;
    nextButtonText: string;
}

const StepButtons: React.FC<StepButtonsProps> = ({ prevButtonText, nextButtonText }) => {
    const { currentStep, nextStep, prevStep } = useStepContext();

    const IrAInicio = () => {
        window.location.href = "/";
    };

    return (
        <div className="appointBoxButtons">
            {currentStep === 0 && <button className='prev' onClick={IrAInicio}>{prevButtonText}</button>}
            {currentStep > 0 && <button className='prev' onClick={prevStep}>{prevButtonText}</button>}
            {currentStep < 4 && <button className='next' onClick={nextStep}>{nextButtonText}</button>}
            {currentStep === 4 && <button className='next' onClick={IrAInicio}>{nextButtonText}</button>}
        </div>
    );
};

export default StepButtons;
