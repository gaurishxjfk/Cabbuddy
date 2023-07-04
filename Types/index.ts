
export interface CabCardProps extends CabObj {
  setSelectedCab: React.Dispatch<React.SetStateAction<CabObj>>;
}

export type CabObj = {
  title: string;
  price: number;
  img: string;
  description: string;
  id: string;
  seating: number;
};
export interface ConfirmBookingCard extends CabObj {
  setSelectedCab: React.Dispatch<React.SetStateAction<CabObj>>;
}
export interface CabDetails {
  id: string;
  title: string;
  img: string;
  reg_no: string;
  car_model: string;
  driver_name: string;
}
export interface RideHistoryCardProps {
  rideObj: {
    id: string;
    cab_details: CabDetails;
    ride_status: string;
    ratings: number;
  };
}

export interface CustomInputProps {
  label: string;
  name: string;
  placeholder: string;
  value: string;
  type: string;
  error?: boolean;
  handleChange: (field: string, value: string, error: boolean ) => void;
  className?: string;
  errormsg: string
}

export interface UserRegisterState {
  fname: registerFormEl;
  lname: registerFormEl;
  email: registerFormEl;
  password: registerFormEl;
  confirmPassword: registerFormEl;
}

export interface UserLoginState {
  email: registerFormEl;
  password: registerFormEl;
}

export interface registerFormEl{
  value: string;
  error: boolean
}
export interface UserRegisterAction {
  type: string;
  field: string;
  value: string;
  error: boolean;
}
