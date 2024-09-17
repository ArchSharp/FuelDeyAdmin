import { createSlice, PayloadAction } from "@reduxjs/toolkit";
import { AppThunk } from "../../Store/store";
import { axios } from "../utils";
import axiosWithAuth from "../utils";
import {
  clearErrors,
  setError /*setSuccess*/,
  setSuccess,
} from "../Error/errorSlice";
import {
  IUserState,
  IResetPassword,
  IAuth,
  // IProfile,
  IProfile,
  IAlertProps,
  StateFuelDashboardData,
  IVendors,
  IBuyers,
  IStaffs,
  // IStaff,
  ISignin,
  ITokens,
  IVendorSummary,
  IFuelSummary,
  ISignUp,
  IUpdateStaff,
  INotifications,
  IUpdateNotification,
} from "./type";

const initialState: IUserState = {
  isLoading: false,
  email: "",
};

const userSlice = createSlice({
  name: "user",
  initialState,
  reducers: {
    setLoading: (state, { payload }: PayloadAction<boolean>) => {
      state.isLoading = payload;
    },

    setLogout: (state) => {
      state.isAuth = false;
      state.token = null;
      state.email = "";
      state.currentUser = null;
      state.alertProps = null;
      state.vendorSummary = null;
      state.vendors = null;
      state.staffs = null;
      state.buyers = null;
      state.notifications = null;
      state.fuelSummary = null;
      state.isLoading = false;
      state.alertProps = null;
      localStorage.clear();
    },

    setProfile: (state, { payload }: PayloadAction<IProfile | null>) => {
      state.currentUser = payload;
      state.isAuth = true;
    },

    setVendors: (state, { payload }: PayloadAction<IVendors | null>) => {
      state.vendors = payload;
    },

    setVendorSummary: (
      state,
      { payload }: PayloadAction<IVendorSummary[] | null>
    ) => {
      state.vendorSummary = payload;
    },

    setFuelSummary: (state, { payload }: PayloadAction<IFuelSummary>) => {
      state.fuelSummary = payload;
    },

    setShowAlert: (state, { payload }: PayloadAction<IAlertProps | null>) => {
      state.alertProps = payload;
    },

    setAuth: (state, { payload }: PayloadAction<IAuth>) => {
      state.isLoading = false;
      state.email = payload.userId;
      state.token = payload.token;
      state.isAuth = true;
    },

    setToken: (state, { payload }: PayloadAction<ITokens>) => {
      state.token = payload;
    },
    setCurrentRoute: (state, { payload }: PayloadAction<string>) => {
      state.currentRoute = payload;
    },
    setIsAuth: (state, { payload }: PayloadAction<boolean>) => {
      state.isAuth = payload;
    },

    setStateFuelDashboardData: (
      state,
      { payload }: PayloadAction<StateFuelDashboardData>
    ) => {
      state.stateFuelDashboardData = payload;
    },

    setBuyers: (state, { payload }: PayloadAction<IBuyers | null>) => {
      state.buyers = payload;
    },

    setNotifications: (
      state,
      { payload }: PayloadAction<INotifications | null>
    ) => {
      state.notifications = payload;
    },

    setStaffs: (state, { payload }: PayloadAction<IStaffs | null>) => {
      state.staffs = payload;
    },

    setEmail: (state, { payload }: PayloadAction<string | null>) => {
      state.email = payload;
    },
  },
});

export const reset_password = (data: IResetPassword): AppThunk => {
  return async (dispatch, getState) => {
    dispatch(setLoading(true));
    try {
      const path = "AdminResetPassword";
      // console.log("checking ResetPassword path: ", path, " data: ", data);
      const response = await axios.patch(path, data);
      if (response) {
        const data = response.data;

        console.log("reset_password response: ", data);
        if (data?.code === 200) {
          var msg: IAlertProps = {
            isError: false,
            showAlert: true,
            content: "You can now login, your password has been reset",
          };
          dispatch(setShowAlert(msg));
          dispatch(setSuccess("Navigate to login"));
        } else {
          // j
        }
      }
    } catch (error: any) {
      dispatch(setError(error?.message));
      var err = error?.response?.data;
      console.log("reset_password error response: ", err);
      var msg: IAlertProps = {
        isError: true,
        showAlert: true,
        content: err?.body,
      };
      dispatch(setShowAlert(msg));

      if (err?.message === "Expired otp") {
        dispatch(forgotPasswordFunc(getState()?.user?.email));
      }
    }
    dispatch(setLoading(false));
  };
};

export const forgotPasswordFunc = (email: string): AppThunk => {
  return async (dispatch) => {
    dispatch(setLoading(true));
    dispatch(clearErrors());
    try {
      const path = `AdminForgotPassword?email=${email}`;
      // console.log("payload: ", data);
      const response = await axios.get(path);
      if (response) {
        const data = response.data;

        console.log("forgotPasswordFunc response: ", data);
        if (data?.code === 200) {
          // dispatch(setVendorSummary(data?.body));
          var msg: IAlertProps = {
            isError: false,
            showAlert: true,
            content: "A Code has been sent to your email, Please check",
          };
          dispatch(setShowAlert(msg));
          dispatch(setSuccess("Navigate to reset password"));
        } else {
          // j
        }
      }
    } catch (error: any) {
      dispatch(setError(error?.message));
      var err = error?.response?.data;
      console.log("forgotPasswordFunc error response: ", err);
      var msg: IAlertProps = {
        isError: true,
        showAlert: true,
        content: err?.body,
      };
      dispatch(setShowAlert(msg));
    }
    dispatch(setLoading(false));
  };
};

export const signIn = (data: ISignin): AppThunk => {
  return async (dispatch) => {
    dispatch(setLoading(true));
    try {
      const path = "SignInAdmin";
      // console.log("checking ResetPassword path: ", path, " data: ", data);
      const response = await axios.post(path, data);
      if (response) {
        const { data } = response;
        // console.log("signIn response: ", data);
        if (data?.code === 200) {
          dispatch(setProfile(data.body));
          dispatch(setToken(data.extrainfo));
          dispatch(setIsAuth(true));
          localStorage.setItem("token", data?.extrainfo?.accesstoken);
          localStorage.setItem("rtoken", data?.extrainfo?.refreshtoken);
          var msg: IAlertProps = {
            isError: false,
            showAlert: true,
            content: "Login Success",
          };
          dispatch(setShowAlert(msg));
        } else if (data?.code !== 200) {
        }
      }
    } catch (error: any) {
      dispatch(setError(error?.message));
      var err = error?.response?.data;
      console.log("reset_password error response: ", err);
      var msg: IAlertProps = {
        isError: true,
        showAlert: true,
        content: err?.body,
      };
      dispatch(setShowAlert(msg));
    }
    dispatch(setLoading(false));
  };
};

export const getNewAccessToken = (): AppThunk => {
  return async (dispatch) => {
    dispatch(setLoading(true));
    dispatch(clearErrors());
    try {
      const refreshToken = localStorage.getItem("rtoken");
      const path = `AdminGetNewAccessToken?refresh_token=${refreshToken}`;
      // console.log("payload: ", data);
      const response = await axiosWithAuth.get(path);
      if (response) {
        const data = response.data;

        if (data?.access_token) {
          console.log("getNewAccessToken response: ", data);
          localStorage.setItem("token", data?.access_token);
        }
      }
    } catch (error: any) {
      console.log("getNewAccessToken error response: ", error);
      dispatch(setError(error?.message));
    }
    dispatch(setLoading(false));
  };
};

export const getVendorSummary = (): AppThunk => {
  return async (dispatch, getState) => {
    dispatch(setLoading(true));
    dispatch(clearErrors());
    try {
      const adminId = getState()?.user?.currentUser?.id;
      const path = `AdminGetVendorSummary?adminId=${adminId}`;
      // console.log("payload: ", data);
      const response = await axiosWithAuth.get(path);
      if (response) {
        const data = response.data;

        console.log("getVendorSummary response: ", data);
        if (data?.code === 200) {
          dispatch(setVendorSummary(data?.body));
        } else {
          // j
        }
      }
    } catch (error: any) {
      console.log("getVendorSummary error response: ", error);
      dispatch(setError(error?.message));
    }
    dispatch(setLoading(false));
  };
};

export const getFuelSummaryData = (): AppThunk => {
  return async (dispatch, getState) => {
    dispatch(setLoading(true));
    dispatch(clearErrors());
    try {
      const adminId = getState()?.user?.currentUser?.id;
      const path = `AdminGetFuelSummary?adminId=${adminId}`;
      // console.log("payload: ", data);
      const response = await axiosWithAuth.get(path);
      if (response) {
        const data = response.data;

        console.log("getFuelSummaryData response: ", data);
        if (data?.code === 200) {
          dispatch(setFuelSummary(data?.body));
        } else {
          // j
        }
      }
    } catch (error: any) {
      console.log("getFuelSummaryData error response: ", error);
      dispatch(setError(error?.message));
    }
    dispatch(setLoading(false));
  };
};

export const getAllVendors = (page: number): AppThunk => {
  return async (dispatch) => {
    dispatch(setLoading(true));
    dispatch(clearErrors());
    try {
      const path = `AdminGetAllVendors?page=${page}`;
      // console.log("payload: ", data);
      const response = await axiosWithAuth.get(path);
      if (response) {
        const data = response.data;

        console.log("getAllVendors response: ", data);
        if (data?.code === 200) {
          dispatch(setVendors(data?.body));
        } else {
          // j
        }
      }
    } catch (error: any) {
      console.log("getAllVendors error response: ", error);
      dispatch(setError(error?.message));
    }
    dispatch(setLoading(false));
  };
};

export const getAllBuyers = (page: number): AppThunk => {
  return async (dispatch) => {
    dispatch(setLoading(true));
    dispatch(clearErrors());
    try {
      const path = `AdminGetAllBuyers?page=${page}`;
      // console.log("payload: ", data);
      const response = await axiosWithAuth.get(path);
      if (response) {
        const data = response.data;

        console.log("getAllBuyers response: ", data);
        if (data?.code === 200) {
          dispatch(setBuyers(data?.body));
        } else {
          // j
        }
      }
    } catch (error: any) {
      console.log("getAllBuyers error response: ", error);
      dispatch(setError(error?.message));
    }
    dispatch(setLoading(false));
  };
};

export const getAllStaffs = (page: number): AppThunk => {
  return async (dispatch) => {
    dispatch(setLoading(true));
    dispatch(clearErrors());
    try {
      const path = `AdminGetAllAdmins?page=${page}`;
      // console.log("payload: ", data);
      const response = await axiosWithAuth.get(path);
      if (response) {
        const data = response.data;

        console.log("getAllStaffs response: ", data);
        if (data?.code === 200) {
          dispatch(setStaffs(data?.body));
        } else {
          // j
        }
      }
    } catch (error: any) {
      console.log("getAllStaffs error response: ", error);
      dispatch(setError(error?.message));
    }
    dispatch(setLoading(false));
  };
};

export const getAllNotifications = (page: number): AppThunk => {
  return async (dispatch, getState) => {
    dispatch(setLoading(true));
    dispatch(clearErrors());
    try {
      const adminId = getState()?.user?.currentUser?.id;
      const path = `AdminGetAllNotifications?page=${page}&adminId=${adminId}`;
      // console.log("payload: ", data);
      const response = await axiosWithAuth.get(path);
      if (response) {
        const data = response.data;

        console.log("getAllNotifications response: ", data);
        if (data?.code === 200) {
          dispatch(setNotifications(data?.body));
        } else {
          // j
        }
      }
    } catch (error: any) {
      console.log("getAllNotifications error response: ", error);
      dispatch(setError(error?.message));
    }
    dispatch(setLoading(false));
  };
};

export const createStaff = (data: ISignUp): AppThunk => {
  return async (dispatch) => {
    dispatch(setLoading(true));
    try {
      const path = "NewAdmin";
      // console.log("checking ResetPassword path: ", path, " data: ", data);
      const response = await axios.post(path, data);
      if (response) {
        const { data } = response;
        console.log("createStaff response: ", data);
        if (data?.code === 201) {
          dispatch(getAllStaffs(1));
          var msg: IAlertProps = {
            isError: false,
            showAlert: true,
            content: "Staff created successfully",
          };
          dispatch(setShowAlert(msg));
        } else if (data?.code !== 201) {
          //
        }
      }
    } catch (error: any) {
      console.log("createStaff error response: ", error);
      dispatch(setError(error?.message));
    }
    dispatch(setLoading(false));
  };
};

export const updateStaff = (data: IUpdateStaff): AppThunk => {
  return async (dispatch, getState) => {
    dispatch(setLoading(true));
    try {
      const adminId = getState()?.user?.currentUser?.id;
      const path = `UpdateAdminById?adminId=${adminId}`;
      // console.log("checking ResetPassword path: ", path, " data: ", data);
      const response = await axiosWithAuth.post(path, data);
      if (response) {
        const { data } = response;
        console.log("updateStaff response: ", data);
        if (data?.code === 200) {
          dispatch(getAllStaffs(1));
          var msg: IAlertProps = {
            isError: false,
            showAlert: true,
            content: "Staff updated Successfully",
          };
          dispatch(setShowAlert(msg));
        } else if (data?.code !== 200) {
          //
        }
      }
    } catch (error: any) {
      console.log("updateStaff error response: ", error);
      dispatch(setError(error?.message));
    }
    dispatch(setLoading(false));
  };
};

export const updateNotification = (data: IUpdateNotification): AppThunk => {
  return async (dispatch, getState) => {
    dispatch(setLoading(true));
    try {
      const adminId = getState()?.user?.currentUser?.id;
      const path = `UpdateVendorNotificationById?adminId=${adminId}`;
      // console.log("checking ResetPassword path: ", path, " data: ", data);
      const response = await axiosWithAuth.post(path, data);
      if (response) {
        const { data } = response;
        console.log("updateNotification response: ", data);
        if (data?.code === 200) {
          dispatch(getAllNotifications(1));
          var msg: IAlertProps = {
            isError: false,
            showAlert: true,
            content: "Notification updated Successfully",
          };
          dispatch(setShowAlert(msg));
        } else if (data?.code !== 200) {
          //
        }
      }
    } catch (error: any) {
      console.log("updateNotification error response: ", error);
      dispatch(setError(error?.message));
    }
    dispatch(setLoading(false));
  };
};

export const getFillingStations = (city: any): AppThunk => {
  return async (dispatch) => {
    dispatch(setLoading(true));
    dispatch(clearErrors());
    try {
      let baseurl = import.meta.env.VITE_PLACES_API;
      baseurl = `${baseurl}&type=gas_station&query=filling station in ${city}`;
      console.log("payload: ", city);

      // Create a new XMLHttpRequest object
      var response = new window.XMLHttpRequest();

      // Open a connection to the specified URL with a POST method
      response.open("POST", baseurl, true);

      // Set the request header to specify the data format (application/json)
      response.setRequestHeader("Content-Type", "text/plain");

      // Define a callback function to handle the response when it is ready
      response.onreadystatechange = function () {
        if (response.readyState === XMLHttpRequest.DONE) {
          if (response.status >= 200 && response.status < 300) {
            // Parse the JSON response
            const responseData = JSON.parse(response.responseText);
            console.log("getFillingStations response: ", responseData);
          } else {
            // Handle HTTP errors
            console.log(
              "getFillingStations error response: ",
              response.statusText
            );
            dispatch(setError(response.statusText));
          }
          // Set loading to false after response is processed
          dispatch(setLoading(false));
        }
      };

      // Send the request with the data in JSON format
      response.send(JSON.stringify({ city: "city" }));
    } catch (error: any) {
      console.log("getFillingStations error response: ", error);
      dispatch(setError(error?.message));
      dispatch(setLoading(false));
    }
  };
};

export const getFillingStationsAxios = (city: string): AppThunk => {
  return async (dispatch) => {
    dispatch(setLoading(true));
    try {
      const placesUrl = import.meta.env.VITE_PLACES_API_URL;
      const apiKey = import.meta.env.VITE_PLACES_API_KEY;
      const params = {
        query: `filling station in ${city}`,
        type: "gas_station",
        key: apiKey,
      };
      // console.log("checking ResetPassword path: ", path, " data: ", data);
      const response = await axios.get(placesUrl, { params });
      if (response) {
        const { results } = response.data;
        console.log("Places data: ", results);
      }
    } catch (error: any) {
      console.log("Places error: ", error);
      dispatch(setError(error?.message));
    }
    dispatch(setLoading(false));
  };
};

// function formatDate(inputDate: string) {
//   const dateObject = new Date(inputDate);

//   const year = dateObject.getFullYear();
//   const month = String(dateObject.getMonth() + 1).padStart(2, "0");
//   const day = String(dateObject.getDate()).padStart(2, "0");

//   return `${year}-${month}-${day}`;
// }

export const {
  setLoading,
  setIsAuth,
  setLogout,
  setProfile,
  setEmail,
  setShowAlert,
  setToken,
  setCurrentRoute,
  setStateFuelDashboardData,
  setVendors,
  setBuyers,
  setStaffs,
  setVendorSummary,
  setFuelSummary,
  setNotifications,
} = userSlice.actions;
export default userSlice.reducer;
