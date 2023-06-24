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
  }
  export interface ConfirmBookingCard extends CabObj {
    setSelectedCab: React.Dispatch<React.SetStateAction<CabObj>>

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

 