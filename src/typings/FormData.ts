export interface FormData {
  _id?: String;
  date: Date;
  professional: string;
  typeOfService: string;
  customer: {
    name: string;
    lastname: string;
    phoneNumber: string;
  };
  disabled?: boolean
}