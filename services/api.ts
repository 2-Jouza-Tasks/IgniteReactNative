import axios, { AxiosInstance, AxiosRequestConfig, AxiosResponse } from "axios";

// Create the Axios instance
const api: AxiosInstance = axios.create({
  baseURL: "https://cross-platform.rp.devfactory.com",
});

// Function to make a dynamic API request
export const request = async <T>(
  url: string,
  method: AxiosRequestConfig["method"] = "get",
  data: any = null,
  config: AxiosRequestConfig = {}
): Promise<T> => {
  try {
    const response: AxiosResponse<T> = await api.request<T>({
      url,
      method,
      data,
      ...config,
    });

    return response.data;
  } catch (error) {
    throw error;
  }
};
