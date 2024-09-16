export interface ISignin {
  email: string;
  password: string;
}

export interface IUserState {
  currentUser?: IProfile | any | null;
  isLoading: boolean;
  isAuth?: boolean;
  token?: ITokens | null;
  vendorSummary?: IVendorSummary[] | null;
  fuelSummary?: IFuelSummary | null;
  alertProps?: IAlertProps | null;
  userId?: string;
  currentRoute?: string;
  stateFuelDashboardData?: StateFuelDashboardData;
  vendors?: IVendors | null;
  buyers?: IBuyers | null;
  staffs?: IStaffs | null;
}

export interface IFuelSummary {
  buyers: IActive;
  vendors: IActive;
  fuelAvailability: IFuelAvailability;
}

export interface IActive {
  active: number;
  inactive: number;
}

export interface IFuelAvailability {
  highstock: number;
  lowstock: number;
}

export interface IVendorSummary {
  availability: number;
  totalstation: number;
  state: string;
  stocklevel: IStocklevel;
}

export interface IStocklevel {
  cookinggas: number;
  diesel: number;
  gas: number;
  kerosene: number;
  petrol: number;
}

export interface IStaffs {
  data: IStaff[];
  pagination: IPagination;
}

export interface IStaff {
  firstName: string;
  lastName: string;
  fullName: string;
  email: string;
  phoneno: string;
  address: string;
  role: string;
  createdAt: string;
  isActive: boolean;
}

export interface IVendors {
  data: IVendor[];
  pagination: IPagination;
}

export interface IVendor {
  vendorName: string;
  manager: string;
  phoneno: string;
  email: string;
  address: string;
  lga: string;
  state: string;
  isFuelAvailable: boolean;
  isActive: boolean;
  fuelTypes: string[];
  ownerType: string;
  stockLevel: StockLevel;
}

export interface IBuyers {
  data: IBuyer[];
  pagination: IPagination;
}

export interface IBuyer {
  fullName: string;
  phoneno: string;
  email: string;
  isActive: boolean;
  lastTenVisitedStation: ILastTenVisitedStation[];
}

export interface ILastTenVisitedStation {
  stationName: string;
  address: string;
  coordinates: string;
  countIn3Days: number;
}

export interface IPagination {
  limit: number;
  page: number;
  totalCount: number;
  totalUser: number;
}

export interface StateFuelDashboardData {
  availability: Availabilty[];
  totalVsAvailability: TotalVsAvailability[];
  stockLevel: StateStockLevel[];
}

export interface StateStockLevel {
  state: string;
  stockLevel: StockLevel;
}

export interface StockLevel {
  petrol: number;
  diesel: number;
  kerosene: number;
  cookingGas: number;
}

export interface Availabilty {
  state: string;
  availability: number;
}

export interface TotalVsAvailability {
  state: string;
  totalStation: number;
  availability: number;
}

export interface IVendorsSummary {}

export interface IAlertProps {
  showAlert: boolean;
  content: string;
  isError: boolean;
}

export interface IAuth {
  userId: string;
  token: ITokens;
}

export interface IProfile {
  id?: string;
  firstname: string;
  lastname: string;
  email: string;
  address: string;
  password: string;
  phonenumber: string;
  imageurl: string;
  is_email_verified?: boolean;
  is_two_factor_enabled?: boolean;
  role: string;
  isactive?: boolean;
  createdat?: string;
  updatedat?: string;
}

export interface ITokens {
  accesstoken: string;
  refreshtoken: string;
}

export interface ICreatePin {
  email: string;
  pin: string;
}

export interface IPasswordUpdate {
  password: string;
  newPassword: string;
  confirm: string;
}

export interface IPasswordChange {
  password: string;
  new_password: string;
  email: string;
}

export interface IPatch {
  op: string;
  value: string;
  path: string;
}

export interface IKyc {
  contact_phone: string;
  firstName?: string;
  lastName?: string;
  reference?: string;
  externalId: string;
  notifications: string[];
}

export interface IForgetPassword {
  email: string;
}

export interface IResetPassword {
  password: string;
  confirm_password: string;
}
