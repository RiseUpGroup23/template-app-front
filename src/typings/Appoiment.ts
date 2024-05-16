export interface Appointment {
    _id?: string;
    patientType: string,
    type: string,
    name: string;
    lastName: string;
    age: number | string;
    dni: string;
    reasonForConsultation: string;
    socialWork: string;
    parentOrGuardianDetails?: {
        name: string;
        lastName: string;
        dni: string;
        contactPhone: string;
        contactEmail: string;
    };
    contactPhone?: string;
    contactEmail?: string;
    date: string;
    hour: string;
    canceled?: boolean;
}