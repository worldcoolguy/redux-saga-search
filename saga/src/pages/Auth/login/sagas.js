import { take, fork, cancel, call, put, cancelled } from 'redux-saga/effects'
import axios from 'axios';
import { push } from 'react-router-redux';
import { effects } from 'redux-saga';
import { createBrowserHistory } from 'history';
import { handleApiErrors } from '../lib/api-errors'

// Our login constants
import {
  LOGIN_REQUESTING,
  LOGIN_SUCCESS,
  LOGIN_ERROR,
} from './constants'

import {
  setClient,
  unsetClient,
} from '../client/actions'

import {
  CLIENT_UNSET,
} from '../client/constants'

const loginUrl = `http://localhost:8080/api/usercheck/`;

function loginApi (email, password) {
  return axios.post(loginUrl,{'email': email,'password':password},{
      validateStatus: function (status) {
        return status < 500; // Reject only if the status code is greater than or equal to 500
      }
    });
}

function* logout () {
  yield put(unsetClient())

  localStorage.removeItem('token')
}

function* loginFlow (email, password) {
  let token
  try {
    token = yield call(loginApi, email, password)

    if(token.data!=="incorrect") yield put({ type: LOGIN_SUCCESS });
    else yield put({ type: LOGIN_ERROR, error:"Email or password is incorrect." });

    localStorage.setItem('token', JSON.stringify(token))

  } catch (error) {
    yield put({ type: LOGIN_ERROR, error })
  } finally {

    if (yield cancelled()) {

    }
  }

  return token
}

function* loginWatcher () {
  while (true) {
    const { email, password } = yield take(LOGIN_REQUESTING)

    const task = yield fork(loginFlow, email, password)

    const action = yield take([CLIENT_UNSET, LOGIN_ERROR])

    if (action.type === CLIENT_UNSET) yield cancel(task)

    yield call(logout)
  }
}

export default loginWatcher
