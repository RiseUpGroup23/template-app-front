import axios from 'axios';
import React, { createContext, useState, useContext, FC } from 'react';
import { useConfig } from './AdminContext';
import { useAppointment } from './ApContext';

interface StepContextType {
    currentStep: number;
    nextStep: () => void;
    prevStep: () => void;
}

const StepContext = createContext<StepContextType | undefined>(undefined);

interface StepProviderProps {
    children: React.ReactNode;
}

export const StepProvider: FC<StepProviderProps> = ({ children }) => {
    const [currentStep, setCurrentStep] = useState<number>(0);
    const { form } = useAppointment()
    const { dbUrl } = useConfig()

    const nextStep = () => {
        setCurrentStep(prevStep => {
            let dateInUTCMinus3 = new Date(form.date.getTime() - (3 * 60 * 60 * 1000));
            let jsonDateInUTCMinus3 = dateInUTCMinus3.toJSON();
            console.log({ ...form, date: jsonDateInUTCMinus3 });
            if (prevStep === 4) {
                axios.post(`${dbUrl}/appointments`, { ...form, date: jsonDateInUTCMinus3 })
            }
            return prevStep + 1
        });
    };

    const prevStep = () => {
        setCurrentStep(prevStep => prevStep - 1);
    };

    return (
        <StepContext.Provider value={{ currentStep, nextStep, prevStep }}>
            {children}
        </StepContext.Provider>
    );
};

export const useStepContext = (): StepContextType => {
    const context = useContext(StepContext);
    if (!context) {
        throw new Error('useStepContext must be used within a StepProvider');
    }
    return context;
};