import Axios from "axios";
import { setIsAuth, setShowAlert } from "./User/userSlice";
import { IAlertProps } from "./User/type";

const baseURL = import.meta.env.VITE_BASEURL;

export const axios = Axios.create({ baseURL, withCredentials: false }); // withCredentials: true

// export const axiosWithAuth = (token: string) =>
//   Axios.create({
//     baseURL,
//     timeout: 10000,
//     headers: {
//       Authorization: "Bearer " + token,
//     },
//   });

const axiosWithAuth = Axios.create();

export const setupAxiosInterceptors = (dispatch: any) => {
  axiosWithAuth.interceptors.request.use((config) => {
    const token = localStorage.getItem("token");
    config.baseURL = baseURL;
    config.timeout = 10000;
    config.headers.Authorization = `Bearer ${token}`;

    return config;
  });

  axiosWithAuth.interceptors.response.use(
    (response) => {
      return response;
    },
    async (error) => {
      if (error?.response && error.response.status === 401) {
        // console.log("Token has expired: ", error?.response?.status);

        var msg: IAlertProps = {
          isError: true,
          showAlert: true,
          content: "Token has expired, please sign in to continue",
        };
        // await dispatch(setShowAlert(msg));
        // await dispatch(setIsAuth(false));
        // await dispatch()

        // After getting a new token, retry the original request
        // const config = error.config;
        // const newToken = store.getState().user.token as string;
        // config.timeout = 15000;
        // config.headers.Authorization = `Bearer ${newToken}`;
        // console.log("config: ", config);

        // return Axios(config);
        return null;
      }
      // If it's not a 403 error, you can handle it as needed or re-throw the error
      return Promise.reject(error);
    }
  );
};

export default axiosWithAuth;
