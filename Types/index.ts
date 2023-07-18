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

export interface CustomFileUploadProps {
  name: string;
  label: string;
  value: string | null;
  error?: string ;
  touched?: boolean ;
  handleChange: (type:string, imgFile: string | undefined) => void;
  handleBlur: (event: React.FocusEvent<HTMLInputElement>) => void;
  className?: string;
}
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

// export interface CustomInputProps {
//   label: string;
//   name: string;
//   placeholder: string;
//   value: string;
//   type: string;
//   error?: boolean;
//   handleChange: (field: string, value: string, error: boolean) => void;
//   className?: string;
//   errormsg: string;
// }

export interface CustomInputProps {
  label: string;
  name: string;
  placeholder: string;
  value: string;
  type: string;
  error?: string;
  touched?: boolean;
  handleChange: (event: React.ChangeEvent<HTMLInputElement>) => void;
  handleBlur: (event: React.FocusEvent<HTMLInputElement>) => void;
  className?: string;
  max?: string;
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

export interface registerFormEl {
  value: string;
  error: boolean;
}
export interface UserRegisterAction {
  type: string;
  field: string;
  value: string;
  error: boolean;
}
export interface userInfo {
  id: number;
  fname: string;
  lname: string;
  email: string;
  isAdmin: boolean;
}
export interface appState {
  isCarModal: boolean;
  isLoggedIn: boolean;
  userInfo: userInfo;
  toggleCarModal: () => void;
  updateUserInfo: (data: userInfo) => void;
}
export interface CabDtls {
  id: number;
  regNo: string;
  cabModel: string;
  cabColor: string;
  engineNo: string;
  seatingCapacity: number;
  fuelType: string;
  cabImage: string ;
  isApproved: boolean;
  createdAt: Date;
  updatedAt: Date;
  ownerId: number;
  owner: any;
}
export interface adminState {
  option: string;
  totalPages: number;
  currentPage: number;
  cab?: CabDtls;
  owner?: CabOwner
  cabData: CabDtls[];
  changeOption: (str: string) => void;
  fetchAllCabs: () => Promise<void>;
  fetchCab: (id: number) => Promise<void>;
  fetchOwner: (id: number) => Promise<void>;
}

export interface ManageHeaderProps {
  title: string;
  searchQuery: string;
  setSearchQuery: React.Dispatch<React.SetStateAction<string>>;
  btnText: string;
}


export interface ManageListProps{
  data: CabDtls[];
}

export interface FileWithSizeAndType extends File {
  size: number;
  type: string;
}

export interface CabOwner {
  ownerName: string;
  ownerEmail: string;
  ownerMobileNo: string;
  ownerAddress: string;
  ownerState: string;
  ownerPincode: string;
  terms: boolean;
  id?: number
}
export interface CabRegDetails {
regNo: string;
cabModel: string;
cabColor: string;
engineNo: string;
seatingCapacity: number;
fuelType: string;
cabImage: string | null ;
id? : number
}

export type CabFormValues = CabOwner & CabRegDetails;