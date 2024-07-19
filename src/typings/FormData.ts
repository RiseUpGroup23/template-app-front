import { TypeOfService } from "./TypeOfServices";

export interface FormData {
  _id?: String;
  date: Date;
  professional: string;
  typeOfService: string | TypeOfService;
  customer: {
    name: string;
    lastname: string;
    phoneNumber: string;
  };
  disabled?: boolean
}