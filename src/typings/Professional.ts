import { TypeOfService } from "./TypeOfServices";

export interface Availability {
    _id: string;
    initialHour: string;
    finalHour: string;
    secondInitialHour: string;
    secondFinalHour: string;
    active?: boolean;
}

export interface Professional {
    _id: string;
    name: string;
    lastname: string;
    email: string;
    phoneNumber: string;
    image: string;
    profession: string;
    timeAvailabilities: TimeAvailability;
    typesOfServices: TypeOfService[];
    disabled: boolean;
    maxAppos: number;
}

export interface TimeAvailability {
    monday: Availability;
    tuesday: Availability;
    wednesday: Availability;
    thursday: Availability;
    friday: Availability;
    saturday: Availability;
    sunday: Availability;
}
