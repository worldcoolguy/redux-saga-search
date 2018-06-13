import axios from 'axios';
import { call, put, takeLatest } from 'redux-saga/effects'
import { handleApiErrors } from '../lib/api-errors'
import {
  SIGNUP_REQUESTING,
  SIGNUP_SUCCESS,
  SIGNUP_ERROR,
} from './constants'

const signupUrl = `http://localhost:8080/api/user/`;

function signupApi (email, password) {
  return axios.post(signupUrl,{'email': email,'password':password},{
      validateStatus: function (status) {
        return status < 500;
      }
    });
}

function* signupFlow (action) {
  try {
    const { email, password } = action

    const response = yield call(signupApi, email, password)

    if(response.data!=="duplicate") yield put({ type: SIGNUP_SUCCESS, response: response.data });
    else yield put({ type: SIGNUP_ERROR, error:"Account is already exist." });

  } catch (error) {
    yield put({ type: SIGNUP_ERROR, error })
  }
}

function* signupWatcher () {
  yield takeLatest(SIGNUP_REQUESTING, signupFlow)
}

export default signupWatcher
