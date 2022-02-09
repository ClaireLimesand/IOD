import axios from 'axios';
import { put, takeLatest, takeEvery } from 'redux-saga/effects';

function* fetchApplications(action) {
    try {
        const response = yield axios({
            method: 'GET',
            url: '/api/applications'
        })
        
        console.log(response.data);
        yield put({
            type: 'SET_APPLICATIONS',
            payload: response.data
        });
    } catch(err) {
        console.error('GET error: ', err);
    }
}

function* sendApplication(action) {
    try {
        yield axios({
            method: 'POST',
            url: '/api/applications',
            data: {company: action.payload.company, name: action.payload.name}
        })
        
        yield put({
            type: 'FETCH_APPLICATIONS'
        });
    } catch(err) {
        console.error('GET error: ', err);
    }
}


function* adminSaga() {
    yield takeLatest('FETCH_APPLICATIONS', fetchApplications);
    yield takeLatest('SEND_APPLICATION', sendApplication);
}

export default adminSaga;
