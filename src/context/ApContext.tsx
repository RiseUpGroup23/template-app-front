import dayjs, {Dayjs} from 'dayjs';
import React, { createContext, useContext, useState, ReactNode } from 'react';
import { Appointment } from '../typings/Appoiment';

interface AppointmentContextProps {
    step: number;
    setStep: React.Dispatch<React.SetStateAction<number>>;
    date: Dayjs | null;
    setDate: React.Dispatch<React.SetStateAction<Dayjs | null>>;
    appointment: Appointment;
    setAppointment: React.Dispatch<React.SetStateAction<Appointment>>;
}

const AppointmentContext = createContext<AppointmentContextProps | undefined>(undefined);

interface AppointmentProviderProps {
    children: ReactNode;
}

export const AppointmentProvider: React.FC<AppointmentProviderProps> = ({ children }) => {
    const [step, setStep] = useState(0)
    const [date, setDate] = useState<Dayjs | null>(dayjs(new Date().toJSON()));
    const [appointment, setAppointment] = useState<Appointment>({
        patientType: "",
        type: "",
        name: "",
        lastName: "",
        age: "",
        dni: "",
        reasonForConsultation: "",
        socialWork: "",
        contactPhone: "",
        contactEmail: "",
        date: "",
        hour: "",
        canceled: false
    })

    const contextValue: AppointmentContextProps = {
        step,
        setStep,
        date,
        setDate,
        appointment,
        setAppointment
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