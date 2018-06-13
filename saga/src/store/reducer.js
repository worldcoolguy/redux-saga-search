import { combineReducers } from 'redux'
import { reducer as form } from 'redux-form'
import { routerReducer } from 'react-router-redux';
import signup from '../pages/Auth/signup/reducer'
import login from '../pages/Auth/login/reducer'
import app from '../pages/App/modules/reducer'

const IndexReducer = combineReducers({
  router: routerReducer,
  signup,
  login,
  form,
  app,
})

export default IndexReducer;
