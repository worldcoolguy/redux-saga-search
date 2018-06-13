import { takeEvery, put } from 'redux-saga/effects';
import { FETCH_GITHUB_REQUEST } from './modules/reducer';

import { searchStart, searchSuccess, searchError } from './modules/actions';

import { fetchGitAPI } from './api';

function* fetchGit(options) {
	console.log('fetching git....');
	try {
		yield put(searchStart());
		//-----------------------------
		const {data} = yield fetchGitAPI(options);
		const retdata = (options.payload.searchtype==='user')? data : data.items;
		yield put(searchSuccess(retdata));
		//-----------------------------
	} catch (err) {
		yield put(searchError(err));
	}
}

function* AppSaga() {
	
	yield takeEvery(FETCH_GITHUB_REQUEST, fetchGit);
}

export default AppSaga;