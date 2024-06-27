export interface FormData {
  date: {
    $date: Date;
  };
  startTime: {
    $date: Date;
  };
  endTime: {
    $date: Date;
  };
  professional: {
    $oid: string;
  };
  typeOfService: {
    $oid: string;
  };
  customer: {
    name: string;
    lastname: string;
    phoneNumber: string;
    email: string;
  };
}