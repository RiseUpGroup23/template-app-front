import { Professional } from "./Professional";
import { TypeOfService } from "./TypeOfServices";

export interface FormData {
  _id?: String;
  date: Date;
  professional: string | Professional;
  typeOfService: string | TypeOfService;
  customer: {
    name: string;
    lastname: string;
    phoneNumber: string;
  };
  disabled?: boolean
}