import dayjs, { Dayjs } from 'dayjs';
import React, { createContext, useContext, useState, ReactNode, useEffect } from 'react';
import { FormData } from '../typings/FormData';

interface AppointmentContextProps {
    step: number;
    setStep: React.Dispatch<React.SetStateAction<number>>;
    date: Dayjs | null;
    setDate: React.Dispatch<React.SetStateAction<Dayjs | null>>;
    form: FormData;
    setForm: React.Dispatch<React.SetStateAction<FormData>>;
}

const AppointmentContext = createContext<AppointmentContextProps | undefined>(undefined);

interface AppointmentProviderProps {
    children: ReactNode;
}

export const AppointmentProvider: React.FC<AppointmentProviderProps> = ({ children }) => {
    const [step, setStep] = useState(0)
    const [date, setDate] = useState<Dayjs | null>(dayjs(new Date().toJSON()));
    const [form, setForm] = useState<FormData>({
        date:  new Date(),
        professional:  "",
        typeOfService:  "",
        customer: {
            name: "",
            lastname: "",
            phoneNumber: ""
        },
    })

    const contextValue: AppointmentContextProps = {
        step,
        setStep,
        date,
        setDate,
        form,
        setForm
    };

    return (
        <AppointmentContext.Provider value={contextValue}>
            {children}
        </AppointmentContext.Provider>
    );
};

export const useAppointment = (): AppointmentContextProps => {
    const context = useContext(AppointmentContext);
    if (!context) {
        throw new Error('useAppointment debe usarse dentro de un AppointmentContextProvider');
    }
    return context;
};