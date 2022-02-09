import axios from 'axios';
import { put, takeLatest, takeEvery } from 'redux-saga/effects';

function* fetchApplications(action) {
    try {
        const response = yield axios({
            method: 'GET',
            url: '/api/applications'
        })
        
        console.log(response.data)
        yield put({
            type: 'SET_APPLICATIONS',
            payload: response.data
        });
    } catch(err) {
        console.error('GET error: ', err);
    }
}


function* adminSaga() {
    yield takeLatest('FETCH_APPLICATIONS', fetchApplications);
}

export default adminSaga;
