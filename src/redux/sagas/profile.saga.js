import axios from 'axios';
import { put, takeLatest } from 'redux-saga/effects';

function* fetchProfile() {
    try {
        const response = yield axios({
            method: 'GET',
            url: '/api/profile'
        });
        yield put({
            type: 'SET_PROFILE',
            payload: response.data
        });
    } catch(err) {
        console.log('Error in fetchProfile Saga', err);
    };
}

function* profileSaga() {
    yield takeLatest('FETCH_PROFILE', fetchProfile);
};

export default profileSaga;