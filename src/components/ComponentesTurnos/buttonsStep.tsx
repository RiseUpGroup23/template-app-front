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
            {currentStep === 0 && <button className='prev' onClick={IrAInicio}>
                <svg width="14" height="24" viewBox="0 0 14 24" fill="none" xmlns="http://www.w3.org/2000/svg">
                    <path d="M0.936702 13.058C0.352378 12.4707 0.354745 11.521 0.941991 10.9366L10.5117 1.41453C11.0989 0.830209 12.0487 0.832577 12.633 1.41982C13.2173 2.00707 13.215 2.95681 12.6277 3.54114L4.12132 12.0052L12.5854 20.5116C13.1697 21.0989 13.1674 22.0486 12.5801 22.633C11.9929 23.2173 11.0431 23.2149 10.4588 22.6277L0.936702 13.058ZM2.99626 13.5024L1.99626 13.4999L2.00374 10.5L3.00374 10.5024L2.99626 13.5024Z" fill="black" fillOpacity="0.7" />
                </svg>
                {prevButtonText}
            </button>}
            {currentStep > 0 && currentStep < 5 && <button className='prev' onClick={prevStep}>
                <svg width="14" height="24" viewBox="0 0 14 24" fill="none" xmlns="http://www.w3.org/2000/svg">
                    <path d="M0.936702 13.058C0.352378 12.4707 0.354745 11.521 0.941991 10.9366L10.5117 1.41453C11.0989 0.830209 12.0487 0.832577 12.633 1.41982C13.2173 2.00707 13.215 2.95681 12.6277 3.54114L4.12132 12.0052L12.5854 20.5116C13.1697 21.0989 13.1674 22.0486 12.5801 22.633C11.9929 23.2173 11.0431 23.2149 10.4588 22.6277L0.936702 13.058ZM2.99626 13.5024L1.99626 13.4999L2.00374 10.5L3.00374 10.5024L2.99626 13.5024Z" fill="black" fillOpacity="0.7" />
                </svg>
                {prevButtonText}
            </button>}
            {currentStep < 5 && <button className='next' onClick={nextStep}>
                {nextButtonText}
                <svg width="13" height="24" viewBox="0 0 13 24" fill="none" xmlns="http://www.w3.org/2000/svg">
                    <path d="M12.1997 10.9393C12.783 11.5251 12.7791 12.4749 12.1909 13.0607L2.60527 22.6065C2.01705 23.1923 1.0673 23.1923 0.483951 22.6065C-0.0994026 22.0207 -0.0954575 21.071 0.492763 20.4852L9.01329 12L0.563254 3.51479C-0.0200992 2.92901 -0.0161541 1.97927 0.572066 1.39349C1.16029 0.807708 2.11003 0.807708 2.69339 1.39349L12.1997 10.9393ZM9.00623 10.5H11.1408L11.1284 13.5H8.99377L9.00623 10.5Z" fill="white" />
                </svg>
            </button>}
            {currentStep === 5 && <button className='next' onClick={IrAInicio}>
                {nextButtonText}
                <svg width="13" height="24" viewBox="0 0 13 24" fill="none" xmlns="http://www.w3.org/2000/svg">
                    <path d="M12.1997 10.9393C12.783 11.5251 12.7791 12.4749 12.1909 13.0607L2.60527 22.6065C2.01705 23.1923 1.0673 23.1923 0.483951 22.6065C-0.0994026 22.0207 -0.0954575 21.071 0.492763 20.4852L9.01329 12L0.563254 3.51479C-0.0200992 2.92901 -0.0161541 1.97927 0.572066 1.39349C1.16029 0.807708 2.11003 0.807708 2.69339 1.39349L12.1997 10.9393ZM9.00623 10.5H11.1408L11.1284 13.5H8.99377L9.00623 10.5Z" fill="white" />
                </svg>
            </button>}
        </div>
    );
};

export default StepButtons;
