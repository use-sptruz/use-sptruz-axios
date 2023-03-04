import type { AxiosError, AxiosResponse } from 'axios';

import type { Action, State } from '../types';

/**
 * @constant initialResponse
 * @description
 * The initial state of the API call reducer
 * @property {AxiosResponse<any, any> | null} response - The response from the API call
 * @property {AxiosError<any> | null} error - The error from the API call
 * @property {boolean} loading - Whether the API call is loading
 */
const initialResponse: State = {
  response: null,
  error: null,
  loading: false,
} as const;

/**
 * @enum Actions
 * @description
 * The actions that can be performed on the state
 * @property {string} INIT - The initial state
 * @property {string} SUCCESS - The state when the API call is successful
 * @property {string} FAIL - The state when the API call fails
 */
const enum Actions {
  INIT = 'init',
  SUCCESS = 'success',
  FAIL = 'fail',
}

/**
 * @function responseReducer
 * @description
 * A reducer that handles the state for an API call
 * @param {State} state - The state of the API call
 * @param {Action} action - The action to be performed on the state
 * @returns {State} The updated state
 */
const responseReducer = <T extends AxiosResponse<T, any> | null>(
  state: State = initialResponse,
  action: Action,
): State => {
  switch (action.type) {
    case Actions.INIT:
      return { response: null, error: null, loading: true };
    case Actions.SUCCESS:
      return { response: action.payload as T, error: null, loading: false };
    case Actions.FAIL:
      return {
        response: null,
        error: action.payload as AxiosError<any>,
        loading: false,
      };
    default:
      return state;
  }
};

export { Actions, initialResponse, responseReducer };
