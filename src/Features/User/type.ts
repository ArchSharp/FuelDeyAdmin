export interface ISignin {
  Email: string;
  Password?: string;
}

export interface IUserState {
  currentUser?: IProfile | any | null;
  isLoading: boolean;
  isAuth?: boolean;
  alertProps?: IAlertProps | null;
  userId?: string;
  token?: string;
  currentRoute?: string;
  stateFuelDashboardData?: StateFuelDashboardData;
  vendors?: IVendors | null;
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
  token: string;
}

export interface IProfile {
  stationName: string;
  address: string;
  state: string;
  lga: string;
  phoneno: string;
  email: string;
  isActive?: boolean;
  password: string;
  userRole?: number;
  dateCreated?: string;
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
