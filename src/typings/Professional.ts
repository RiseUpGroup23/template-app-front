import { TypeOfService } from "./TypeOfServices";

interface Availability {
    initialHour: string;
    finalHour: string;
    secondInitialHour: string;
    secondFinalHour: string;
}

export interface Professional {
    name: string;
    lastname: string;
    email: string;
    phoneNumber: string;
    image: string;
    timeWindow: number;
    timeAvailabilities: {
        monday: Availability;
        tuesday: Availability;
        wednesday: Availability;
        thursday: Availability;
        friday: Availability;
        saturday: Availability;
        sunday: Availability;
    };
    typesOfServices: TypeOfService[];
}
