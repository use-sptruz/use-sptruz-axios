import type { AxiosError, AxiosResponse, CancelTokenSource } from 'axios';
import axios from 'axios';
import { useCallback, useEffect, useReducer, useState } from 'react';

import type { ResponseState, UseAxios } from '../types';
import {
  Actions,
  initialResponse,
  responseReducer,
} from '../utils/responseReducer.util';

/**
 * @function useAxios
 * @description
 * A React hook that handles the state for an API call using axios.
 * @param {UseAxios} options - Options for the API call.
 * @param {AxiosInstance} [options.axios] - An axios instance to use. Defaults to the global axios instance.
 * @param {string} options.url - The URL to make the API call to.
 * @param {Method} [options.method='get'] - The HTTP method to use for the API call.
 * @param {AxiosRequestConfig} [options.options={}] - Additional options to pass to the axios request.
 * @param {object | string} [options.trigger] - A value that, when changed, triggers a refetch of the API call.
 * @param {Function} [options.forceDispatchEffect] - A function that determines whether the API call should be made.
 * @param {Function} [options.customHandler] - A custom handler function for the API call response and error.
 * @returns {ResponseState} - The state of the API call, including `response`, `error`, `loading`, and a `refetch` function.
 */
const useAxios = <T>({
  axios: axiosInstance = axios,
  url,
  method = 'get',
  options = {},
  trigger,
  forceDispatchEffect,
  customHandler,
}: UseAxios<T> = {}): ResponseState => {
  const [results, dispatch] = useReducer(responseReducer, initialResponse);
  const [innerTrigger, setInnerTrigger] = useState(0);

  const outerTrigger =
    typeof trigger === 'undefined' ? null : JSON.stringify(trigger);

  const dispatchEffect = forceDispatchEffect || (() => true);

  const handler = useCallback(
    (
      error: AxiosError<T> | unknown | null,
      response: AxiosResponse<T> | null,
    ): void => {
      if (customHandler) {
        customHandler(error, response);
      }
    },
    [customHandler],
  );

  const fetchData = useCallback(async () => {
    if (!url || !dispatchEffect()) {
      return;
    }

    if (!outerTrigger && !innerTrigger) {
      return;
    }

    handler(null, null);
    dispatch({ type: Actions.INIT });

    const source: CancelTokenSource = axios.CancelToken.source();

    try {
      const response = await axiosInstance({
        url,
        method,
        ...options,
        cancelToken: source.token,
      });
      handler(null, response);
      dispatch({ type: Actions.SUCCESS, payload: response });
    } catch (error) {
      handler(error, null);
      if (!axios.isCancel(error)) {
        dispatch({ type: Actions.FAIL, payload: error });
      }
    } finally {
      source.cancel();
    }
  }, [dispatchEffect, handler, innerTrigger, options, outerTrigger, url]);

  useEffect(() => {
    fetchData();
  }, [innerTrigger, outerTrigger]);

  const refetch = (): void => {
    setInnerTrigger((prevState) => prevState + 1);
  };

  return {
    ...results,
    refetch,
  };
};

export { useAxios };
