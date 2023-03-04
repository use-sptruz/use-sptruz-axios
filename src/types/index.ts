import type {
  AxiosError,
  AxiosInstance,
  AxiosRequestConfig,
  AxiosResponse,
  Method,
} from 'axios';

/**
 * @interface State
 * @description
 * The state of the API call
 * @property response The response from the API call, if successful
 * @property error The error from the API call, if failed
 * @property loading Whether the API call is currently loading or not
 */
interface State {
  error: AxiosError<any> | null;
  loading: boolean;
  response: AxiosResponse<any, any> | null;
}

/**
 * @interface Action
 * @description
 * The action to be dispatched to the reducer
 * @property type The type of action to be dispatched: "init", "success", or "fail"
 * @property payload The payload to be dispatched, which can be an Axios error object, an unknown object, or null
 */
interface Action {
  type: 'init' | 'success' | 'fail';
  payload?: AxiosError<any> | unknown | null;
}

/**
 * @interface ResponseState
 * @description
 * The state of the API call, including a function to refetch the data
 * @property response The response from the API call, if successful
 * @property error The error from the API call, if failed
 * @property loading Whether the API call is currently loading or not
 * @property refetch A function to refetch the data
 */
interface ResponseState extends Omit<State, 'refetch'> {
  refetch: () => void;
}

/**
 * @interface UseAxios
 * @description
 * The options for the useAxios hook
 * @property axios The axios instance to use
 * @property url The URL to make the API call to
 * @property method The HTTP method to use for the API call
 * @property options The options to use for the API call
 * @property trigger A trigger to refetch the data, which can be an object or a string
 * @property forceDispatchEffect A function that determines whether the API call should be made or not
 * @property customHandler A custom handler for the API call, which can be used to handle errors or responses
 */
interface UseAxios<T> {
  axios?: AxiosInstance;
  url?: string;
  method?: Method;
  options?: AxiosRequestConfig;
  trigger?: object | string;
  forceDispatchEffect?: () => boolean;
  customHandler?: (
    error: AxiosError<T> | unknown | null,
    response: AxiosResponse<T> | null,
  ) => void;
}

export type { Action, ResponseState, State, UseAxios };
