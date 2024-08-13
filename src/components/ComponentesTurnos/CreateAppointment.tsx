import { useEffect, useState } from 'react';
import StepButtons from './buttonsStep';
import { AppointmentProvider, useAppointment } from '../../context/ApContext';
import { StepProvider, useStepContext } from '../../context/StepContext';
import { Step0, Step1, Step2, Step3, Step4 } from './indexAppointments';
import { useConfig } from '../../context/AdminContext';
import { useParams } from 'react-router-dom';
import axios from 'axios';

const CreateAppointment = () => {
    return (
        <AppointmentProvider>
            <StepProvider>
                <CreandoTurnos />
            </StepProvider>
        </AppointmentProvider>
    );
};

const CreandoTurnos = () => {
    const { currentStep, nextStep } = useStepContext();
    const [nextButtonEnabled, setNextButtonEnabled] = useState<boolean>(false);
    const { config, dbUrl } = useConfig()
    const { setForm } = useAppointment()
    const { reproId } = useParams()

    useEffect(() => {
        if (reproId) {
            axios(`${dbUrl}/appointments/${reproId}`).then(res => {
                setForm({
                    ...res.data,
                    typeOfService: res.data.typeOfService._id,
                    professional: res.data.professional._id
                })
                nextStep(3)
            })
        } else {
            setForm({
                date: new Date(),
                professional: "",
                typeOfService: "",
                customer: {
                    name: "",
                    lastname: "",
                    phoneNumber: ""
                },
            })
            nextStep(0)
        }
        //eslint-disable-next-line
    }, [reproId])

    const buttonTexts = [
        { prev: 'Inicio' },
        { prev: 'Anterior' },
        { prev: 'Anterior', next: 'Continuar' },
        { prev: 'Anterior', next: 'Continuar' },
        { prev: 'Anterior', next: config?.appointment.mercadoPago && !reproId ? 'Ir a Pagar' : (reproId ? "Guardar" : "Confirmar") },
        // { prev: '', next: 'Ir a Inicio' }
    ];

    return (
        <div>
            <div className="containerStep">
                {currentStep === 0 && <Step0 />}
                {currentStep === 1 && <Step1 />}
                {currentStep === 2 && <Step2 setIsFormComplete={setNextButtonEnabled} />}
                {currentStep === 3 && (
                    <Step3 setNextButtonEnabled={setNextButtonEnabled} />
                )}
                {currentStep === 4 && <Step4 />}
            </div>
            <StepButtons
                prevButtonText={buttonTexts[currentStep].prev}
                nextButtonText={buttonTexts[currentStep].next}
                isNextButtonEnabled={nextButtonEnabled}
            />

        </div>
    );
};

export default CreateAppointment;