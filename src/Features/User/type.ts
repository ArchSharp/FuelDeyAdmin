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
}

export interface StateFuelDashboardData {
  availability: Availabilty[];
  totalVsAvailability: TotalVsAvailability[];
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
