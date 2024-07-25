import React, { useState } from 'react';
import { useStepContext } from '../../context/StepContext';
import './styleTurnos.css';
import { useConfig } from '../../context/AdminContext';
import hexToRgb from '../../modules/hexToRgb';
import { useAppointment } from '../../context/ApContext';
import axios from 'axios';
import PaymentStep from './PaymentStep';
import { CircularProgress } from '@mui/material';

interface StepButtonsProps {
    prevButtonText: string;
    nextButtonText?: string;
    isNextButtonEnabled: boolean;
}

const StepButtons: React.FC<StepButtonsProps> = ({ prevButtonText, nextButtonText, isNextButtonEnabled }) => {
    const { currentStep, nextStep, prevStep } = useStepContext();
    const { dbUrl, config } = useConfig()
    const { form } = useAppointment()
    const [paymentReady, setPaymentReady] = useState(false)

    const GoToHome = () => {
        window.location.href = "/";
    };

    const createAppointment = async () => {
        if (config?.appointment.mercadoPago) {
            const mpButton = document.querySelector("#wallet_container button") as HTMLDivElement
            if (mpButton) {
                mpButton.click()
            }
        } else {
            let dateInUTCMinus3 = new Date(form.date.getTime() - (3 * 60 * 60 * 1000));
            let jsonDateInUTCMinus3 = dateInUTCMinus3.toJSON();

            await axios.post(`${dbUrl}/appointments`, {
                ...form,
                date: jsonDateInUTCMinus3,
                customer: {
                    ...form.customer,
                    name: form.customer.name.split(" ")[0],
                    lastname: form.customer.name.split(" ")[1] ?? ""
                }
            }).then(() => {
                nextStep()
            })
        }
    }

    const handleNext = async () => {
        if (currentStep === 4) {
            await createAppointment()
        } else nextStep()
    }

    if (!config) return <></>

    return (
        <div className="appointBoxButtons">
            {currentStep === 0 && <button className='prev' onClick={GoToHome}>
                <svg width="14" height="24" viewBox="0 0 14 24" fill="none" xmlns="http://www.w3.org/2000/svg">
                    <path d="M0.936702 13.058C0.352378 12.4707 0.354745 11.521 0.941991 10.9366L10.5117 1.41453C11.0989 0.830209 12.0487 0.832577 12.633 1.41982C13.2173 2.00707 13.215 2.95681 12.6277 3.54114L4.12132 12.0052L12.5854 20.5116C13.1697 21.0989 13.1674 22.0486 12.5801 22.633C11.9929 23.2173 11.0431 23.2149 10.4588 22.6277L0.936702 13.058ZM2.99626 13.5024L1.99626 13.4999L2.00374 10.5L3.00374 10.5024L2.99626 13.5024Z" fill="black" fillOpacity="0.7" />
                </svg>
                {prevButtonText}
            </button>}
            {currentStep > 0 && currentStep < 5 && <button className='prev' onClick={() => prevStep()}>
                <svg width="14" height="24" viewBox="0 0 14 24" fill="none" xmlns="http://www.w3.org/2000/svg">
                    <path d="M0.936702 13.058C0.352378 12.4707 0.354745 11.521 0.941991 10.9366L10.5117 1.41453C11.0989 0.830209 12.0487 0.832577 12.633 1.41982C13.2173 2.00707 13.215 2.95681 12.6277 3.54114L4.12132 12.0052L12.5854 20.5116C13.1697 21.0989 13.1674 22.0486 12.5801 22.633C11.9929 23.2173 11.0431 23.2149 10.4588 22.6277L0.936702 13.058ZM2.99626 13.5024L1.99626 13.4999L2.00374 10.5L3.00374 10.5024L2.99626 13.5024Z" fill="black" fillOpacity="0.7" />
                </svg>
                {prevButtonText}
            </button>}
            {currentStep < 5 && nextButtonText && <button className={`next ${!isNextButtonEnabled ? 'disabled' : ''}`} style={{ backgroundColor: `${hexToRgb(config.customization.primary.color)}`, color: `${config.customization.primary.text}` }} onClick={handleNext} disabled={!isNextButtonEnabled}>
                {currentStep !== 4 || paymentReady ?
                    <>
                        {nextButtonText}
                        <svg width="13" height="24" viewBox="0 0 13 24" fill="none" xmlns="http://www.w3.org/2000/svg" style={{ color: `${config.customization.primary.text}` }}>
                            <path style={{ fill: `${config.customization.primary.text}` }} d="M12.1997 10.9393C12.783 11.5251 12.7791 12.4749 12.1909 13.0607L2.60527 22.6065C2.01705 23.1923 1.0673 23.1923 0.483951 22.6065C-0.0994026 22.0207 -0.0954575 21.071 0.492763 20.4852L9.01329 12L0.563254 3.51479C-0.0200992 2.92901 -0.0161541 1.97927 0.572066 1.39349C1.16029 0.807708 2.11003 0.807708 2.69339 1.39349L12.1997 10.9393ZM9.00623 10.5H11.1408L11.1284 13.5H8.99377L9.00623 10.5Z" fill="white" />
                        </svg>
                    </>
                    :
                    <div style={{ width: 100, display: "flex", alignItems: "center", justifyContent: "center" }}>
                        <CircularProgress size={20} sx={{ color: `${config.customization.primary.text}` }} />
                    </div>
                }
            </button>}
            {currentStep === 5 && nextButtonText !== "" && <button className='next' style={{ backgroundColor: `${hexToRgb(config.customization.primary.color)}`, color: `${config.customization.primary.text}` }} onClick={GoToHome}>
                {nextButtonText}
                <svg width="13" height="24" viewBox="0 0 13 24" fill="none" xmlns="http://www.w3.org/2000/svg" style={{ color: `${config.customization.primary.text}` }}>
                    <path style={{ fill: `${config.customization.primary.text}` }} d="M12.1997 10.9393C12.783 11.5251 12.7791 12.4749 12.1909 13.0607L2.60527 22.6065C2.01705 23.1923 1.0673 23.1923 0.483951 22.6065C-0.0994026 22.0207 -0.0954575 21.071 0.492763 20.4852L9.01329 12L0.563254 3.51479C-0.0200992 2.92901 -0.0161541 1.97927 0.572066 1.39349C1.16029 0.807708 2.11003 0.807708 2.69339 1.39349L12.1997 10.9393ZM9.00623 10.5H11.1408L11.1284 13.5H8.99377L9.00623 10.5Z" fill="white" />
                </svg>
            </button>}
            {currentStep === 4 && <div className='mpContainer'>
                <PaymentStep setPaymentReady={setPaymentReady} />
            </div>}
        </div>
    );
};

export default StepButtons;