import React, { createContext, useState, useContext, FC } from 'react';

interface StepContextType {
    currentStep: number;
    previous: number;
    nextStep: (forced?: number) => void;
    prevStep: (forced?: number) => void;
}

const StepContext = createContext<StepContextType | undefined>(undefined);

interface StepProviderProps {
    children: React.ReactNode;
}

export const StepProvider: FC<StepProviderProps> = ({ children }) => {
    const [currentStep, setCurrentStep] = useState<number>(0);
    const [previous, setPrevious] = useState<number>(0);

    const nextStep = async (forced?: number) => {
        setCurrentStep(prevStep => {
            setPrevious(prevStep)
            return forced ?? prevStep + 1
        });
    };

    const prevStep = (forced?: number) => {
        setCurrentStep(prevStep => {
            setPrevious(prevStep)
            return forced ?? prevStep - 1
        });
    };

    return (
        <StepContext.Provider value={{ currentStep, nextStep, prevStep, previous }}>
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