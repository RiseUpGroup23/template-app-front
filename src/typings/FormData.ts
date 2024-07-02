export interface FormData {
  date: Date;
  professional: string;
  typeOfService: string;
  customer: {
    name: string;
    lastname: string;
    phoneNumber: string;
  };
}