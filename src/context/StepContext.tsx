import React, { createContext, useState, useContext, FC } from 'react';

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

    const nextStep = () => {
        setCurrentStep(prevStep => prevStep + 1);
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