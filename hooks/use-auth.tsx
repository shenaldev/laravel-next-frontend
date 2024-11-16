import axios, { AxiosResponse } from "axios";
import { useAuthProvider } from "@/components/providers/auth-provider";
import { UserResponse } from "@/types/api-response";

const apiURL = process.env.NEXT_PUBLIC_API_URL;
const axiosOptions = {
  withCredentials: true,
  withXSRFToken: true,
  headers: {
    Accept: "application/json",
    "Content-Type": "application/json",
  },
};

type User = {
  email: string;
  password: string;
};

type NewUser = User & {
  name: string;
  password_confirmation: string;
};

export default function useAuth() {
  const authProvider = useAuthProvider();

  /**************************************************
   * Login user and set user data in local storage
   * @param user User
   * @param path url to login route
   * @returns axios data | error
   *************************************************/
  const login = async (user: User, path: string) => {
    return axios
      .post(`${apiURL}${path}`, user, axiosOptions)
      .then((response: AxiosResponse<UserResponse>) => {
        handleSuccessResponse(response);
      })
      .catch((error) => {
        throw error;
      });
  };

  /**************************************************
   * Register new user and login in frontend
   * @param user form data for new user registration
   * @param path url to register route
   * @returns axios data | error
   *************************************************/
  const register = async (user: NewUser, path: string) => {
    return axios
      .post(`${apiURL}${path}`, user, axiosOptions)
      .then((response: AxiosResponse<UserResponse>) => {
        handleSuccessResponse(response);
      })
      .catch((error) => {
        throw error;
      });
  };

  /**********************************************************
   * Logout user and remove user data from local storage
   * @param path url to logout route
   * @returns axios data | error
   *********************************************************/
  const logout = async (path: string) => {
    localStorage.removeItem("user");
    if (authProvider.removeUser) authProvider.removeUser();
    return axios.post(`${apiURL}${path}`, {}, axiosOptions).then(() => {
      window.location.replace("/auth/login");
    });
  };

  /************************************************************
   * Check user token is valid and redirect to login page
   * @param path url to check token route
   * @returns axios data | error
   ************************************************************/
  const checkToken = async (path: string) => {
    return axios
      .get(`${apiURL}${path}`, axiosOptions)
      .then((response: AxiosResponse<UserResponse>) => {
        return response;
      })
      .catch((error) => {
        if (error.response.status === 401) {
          localStorage.removeItem("user");
          window.location.replace("/auth/login?error=unauthorized");
        }
      });
  };

  /************************************************************
   * oAuth login and set user data in local storage
   * @param path url to oAuth route
   * @param token oAuth token
   * @returns axios data | error
   ************************************************************/
  const oAuth = async (path: string, token: string) => {
    return axios
      .post(
        `${apiURL}${path}`,
        {
          token: token,
        },
        axiosOptions
      )
      .then((response: AxiosResponse<UserResponse>) => {
        handleSuccessResponse(response);
      })
      .catch((error) => {
        throw error;
      });
  };

  /************************************************************
   * Handle success response from login, register and oAuth
   * @param response axios response
   ************************************************************/
  function handleSuccessResponse(response: AxiosResponse<UserResponse>) {
    if (response.status == 201) {
      if (response.data.user != null) {
        handleSuccessAuth(response.data);
        if (authProvider.logUser) authProvider.logUser(response.data.user);
      }
    }
  }

  return { login, register, logout, checkToken, oAuth };
}

/**
 * Set user data in local storage and redirect to home page
 * When user is successfully authenticated
 * @param user UserResponse
 */
function handleSuccessAuth(user: Omit<UserResponse, "token">) {
  localStorage.setItem("user", JSON.stringify(user.user));
  window.location.replace("/");
}
