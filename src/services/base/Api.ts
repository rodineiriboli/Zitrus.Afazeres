import axios, { AxiosResponse } from "axios";

const backendApi = axios.create({
  baseURL: process.env.REACT_APP_API,
});

const errorRedirect = () => {
  document.location.href = "/error";
};

const onFullFilled = (response: AxiosResponse<any>) => {
  if (response?.data?.errors) {
    const error = response.data.errors[0];
    if (error.extensions.code === "AUTH_NOT_AUTHENTICATED") {
      errorRedirect();
    }
  }
  if (response?.request?.response.includes("Acesso não autorizado")) {
    errorRedirect();
  }
  if (response?.status === 403) {
    errorRedirect();
  }
  return response;
};

const onRejected = (error: Error) => Promise.reject(error);

// configura os interceptadores para cada instância do axios
backendApi.interceptors.response.use(onFullFilled, onRejected);

export { backendApi };
