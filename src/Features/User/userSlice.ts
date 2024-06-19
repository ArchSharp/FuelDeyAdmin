import { createSlice, PayloadAction } from "@reduxjs/toolkit";
import { AppThunk } from "../../Store/store";
import { axios } from "../utils";
import axiosWithAuth from "../utils";
import { clearErrors, setError /*setSuccess*/ } from "../Error/errorSlice";
import {
  IUserState,
  IResetPassword,
  IAuth,
  // IProfile,
  IProfile,
  IAlertProps,
} from "./type";

const initialState: IUserState = {
  isLoading: false,
  userId: "",
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
      state.token = "";
      state.userId = "";
      state.currentUser = null;
      state.alertProps = null;
    },

    setProfile: (state, { payload }: PayloadAction<IProfile>) => {
      state.currentUser = payload;
      state.isAuth = true;
    },

    setShowAlert: (state, { payload }: PayloadAction<IAlertProps | null>) => {
      state.alertProps = payload;
    },

    setAuth: (state, { payload }: PayloadAction<IAuth>) => {
      state.isLoading = false;
      state.userId = payload.userId;
      state.token = payload.token;
      state.isAuth = true;
    },

    setToken: (state, { payload }: PayloadAction<string>) => {
      state.token = payload;
    },
    setCurrentRoute: (state, { payload }: PayloadAction<string>) => {
      state.currentRoute = payload;
    },
    setIsAuth: (state, { payload }: PayloadAction<boolean>) => {
      state.isAuth = payload;
    },
  },
});

export const reset_password = (data: IResetPassword): AppThunk => {
  return async (dispatch) => {
    dispatch(setLoading(true));
    try {
      const path = "/ResetPassword";
      // console.log("checking ResetPassword path: ", path, " data: ", data);
      const response = await axios.put(path, data);
      if (response) {
        const { data } = response;
        if (data && !data.token) {
          if (data.error.length > 0)
            data.error.forEach((element: string) => {
              dispatch(setError(element));
            });
          else if (data.message) dispatch(setError(data.message));
        } else if (data && data.token) {
          // dispatch(setProfile(data.profile));
          // dispatch(setToken(data.token));
        }
      }
    } catch (error: any) {
      dispatch(setError(error?.message));
    }
    dispatch(setLoading(false));
  };
};

export const getAllAgents = (pageIndex: number): AppThunk => {
  return async (dispatch) => {
    dispatch(setLoading(true));
    dispatch(clearErrors());
    try {
      const path = `GetAllAgents?pageNo=${pageIndex}`;
      // console.log("payload: ", data);
      const response = await axiosWithAuth.get(path);
      if (response) {
        const data = response.data;

        console.log("getAllAgents response: ", data);
        if (data.status === true) {
          if (data?.responseCode === "100") {
            //
          }
        } else {
          // j
        }
      }
    } catch (error: any) {
      console.log("getAllAgents error response: ");
      dispatch(setError(error?.message));
    }
    dispatch(setLoading(false));
  };
};

export const SignUp = (data: any): AppThunk => {
  return async (dispatch) => {
    dispatch(setLoading(true));
    dispatch(clearErrors());
    try {
      let baseurl = import.meta.env.VITE_BASEURL;

      console.log("payload: ", data);

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
            console.log("SignUp response: ", responseData);

            // Handle successful response
            let msg: IAlertProps = {
              isError: true,
              showAlert: true,
              content: responseData?.message,
            };
            if (responseData?.message === "User already exist") {
              msg.isError = true;
            } else if ("Registartion is successful") {
              msg.isError = false;
            }
            dispatch(setShowAlert(msg));
          } else {
            // Handle HTTP errors
            console.log("SignUp error response: ", response.statusText);
            dispatch(setError(response.statusText));
          }
          // Set loading to false after response is processed
          dispatch(setLoading(false));
        }
      };

      // Send the request with the data in JSON format
      response.send(JSON.stringify(data));
    } catch (error: any) {
      console.log("SignUp error response: ", error);
      dispatch(setError(error?.message));
      dispatch(setLoading(false));
    }
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
  setShowAlert,
  setToken,
  setCurrentRoute,
} = userSlice.actions;
export default userSlice.reducer;
