import {
  SEARCH_REQUEST,
  SEARCH_SUCCESS,
  SEARCH_ERROR,
  FETCH_GITHUB_REQUEST,
} from './reducer';

export const searchStart = () => {
  return {
    type: SEARCH_REQUEST,
  };
};

export const searchSuccess = (userdata) => {
  return {
    type: SEARCH_SUCCESS,
    payload: userdata,
  };
};

export const searchError = (errors) => {
  return {
    type: SEARCH_ERROR,
    errors,
  };
};
export const fetchGit = (options) => ({
  type: FETCH_GITHUB_REQUEST,
  payload: options,
})

