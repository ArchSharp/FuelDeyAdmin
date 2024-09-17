export interface ISignin {
  email: string;
  password: string;
}

export interface ISignUp {
  address: string;
  email: string;
  firstname: string;
  lastname: string;
  password: string;
  phonenumber: string;
  role: string;
}

export interface IUpdateStaff {
  address: string;
  phonenumber: string;
  role: string;
  adminid: string;
}

export interface IUpdateNotification {
  id: string;
  isadminread: boolean;
  response: string;
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
  notifications?: INotifications | null;
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

export interface INotifications {
  data: INotification[];
  pagination: IPagination;
}

export interface INotification {
  commuterid: string;
  commutername: string;
  createdat: string;
  id: string;
  isadminread: boolean;
  ishelp: boolean;
  question: string;
  repliedby: string;
  response: string;
  updatedat: string;
  vendorid: string;
  vendorname: string;
}

export interface IStaffs {
  data: IStaff[];
  pagination: IPagination;
}

export interface IStaff {
  address: string;
  createdat: string;
  email: string;
  firstname: string;
  id: string;
  imageurl: string;
  is_email_verified: boolean;
  is_two_factor_enabled: boolean;
  isactive: boolean;
  lastname: string;
  password: string;
  phonenumber: string;
  role: string;
  updatedat: string;
}

export interface IVendors {
  data: IVendor[];
  pagination: IPagination;
}

export interface IVendor {
  address: string;
  averagerating: number;
  commuterrating: number;
  createdat: string;
  diesellevel: number;
  dieselprice: number;
  email: string;
  gaslevel: number;
  gasprice: number;
  id: string;
  isactive: boolean;
  isdiesel: boolean;
  isgas: boolean;
  ispetrol: boolean;
  iskerosene: boolean;
  kerosenelevel: number;
  latitude: string;
  lga: string;
  longitude: string;
  petrollevel: number;
  petrolprice: number;
  keroseneprice: number;
  phonenumber: string;
  postalcode: number;
  ratingcount: any;
  state: string;
  stationname: string;
  totalrater: number;
  updatedat: string;
}

export interface IBuyers {
  data: IBuyer[];
  pagination: IPagination;
}

export interface IBuyer {
  createdat: string;
  email: string;
  firstname: string;
  id: string;
  imageurl: string;
  is_email_verified: boolean;
  is_two_factor_enabled: boolean;
  isactive: boolean;
  lastname: string;
  lasttenvisitedstations: ILastTenVisitedStation[];
  password: string;
  phonenumber: string;
  role: string;
  updatedat: string;
}

export interface ILastTenVisitedStation {
  commuterid: string;
  frequency: number;
  stationaddress: string;
  stationid: string;
  stationname: string;
}

export interface IPagination {
  limit: number;
  page: number;
  total: number;
  total_pages: number;
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
