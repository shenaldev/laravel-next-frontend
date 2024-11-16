import axios, { AxiosError } from "axios";

const apiUrl = process.env.NEXT_PUBLIC_API_URL;
const baseUrl = process.env.NEXT_PUBLIC_BASE_URL;
const apiVersion = "";

type axiosProps = {
  method: "GET" | "POST" | "PUT" | "DELETE" | "PATCH";
  urlPath: string;
  data?: unknown;
  isBase?: boolean;
};

export const axiosCall = async ({
  method,
  urlPath,
  data,
  isBase = false,
}: axiosProps) => {
  const url = `${isBase ? baseUrl : apiUrl}${apiVersion}${urlPath}`;

  const response = await axios({
    method,
    url,
    data: data,
    withCredentials: true,
    withXSRFToken: true,
    headers: {
      Accept: "application/json",
      "Content-Type": "multipart/form-data",
    },
  })
    .then((response) => {
      return response.data;
    })
    .catch((err: AxiosError) => {
      /**********************************
       * Handle Server Errors With Status Code Of 401
       * @returns Redirects To Login Page
       ************************************/
      if (err?.response?.status == 401) {
        localStorage.removeItem("user");
        window.location.href = "/auth/login?error=unauthorized";
        return;
      }

      throw err;
    });

  return response;
};
