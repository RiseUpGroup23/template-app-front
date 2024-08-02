import React, { useState } from 'react';
import { useStepContext } from '../../context/StepContext';
import './styleTurnos.css';
import { useConfig } from '../../context/AdminContext';
import hexToRgb from '../../modules/hexToRgb';
import { useAppointment } from '../../context/ApContext';
import axios from 'axios';
import PaymentStep from './PaymentStep';
import { CircularProgress } from '@mui/material';
import ArrowBackIosNewIcon from '@mui/icons-material/ArrowBackIosNew';
import ArrowForwardIosIcon from '@mui/icons-material/ArrowForwardIos';

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
                <ArrowBackIosNewIcon/>
                {prevButtonText}
            </button>}
            {currentStep > 0 && currentStep < 5 && <button className='prev' onClick={() => prevStep()}>
                <ArrowBackIosNewIcon/>
                {prevButtonText}
            </button>}
            {currentStep < 5 && nextButtonText && <button className={`next ${!isNextButtonEnabled ? 'disabled' : ''}`} style={{ backgroundColor: `${hexToRgb(config.customization.primary.color)}`, color: `${config.customization.primary.text}` }} onClick={handleNext} disabled={!isNextButtonEnabled}>
                {currentStep !== 4 || paymentReady ?
                    <>
                        {nextButtonText}
                        <ArrowForwardIosIcon/>
                    </>
                    :
                    <div style={{ width: 100, display: "flex", alignItems: "center", justifyContent: "center" }}>
                        <CircularProgress size={20} sx={{ color: `${config.customization.primary.text}` }} />
                    </div>
                }
            </button>}
            {currentStep === 5 && nextButtonText !== "" && <button className='next' style={{ backgroundColor: `${hexToRgb(config.customization.primary.color)}`, color: `${config.customization.primary.text}` }} onClick={GoToHome}>
                {nextButtonText}
                <ArrowForwardIosIcon/>
            </button>}
            {currentStep === 4 && <div className='mpContainer'>
                <PaymentStep setPaymentReady={setPaymentReady} />
            </div>}
        </div>
    );
};

export default StepButtons;