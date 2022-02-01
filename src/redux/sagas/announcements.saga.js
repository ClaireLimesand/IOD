import axios from 'axios';
import { put, takeLatest } from 'redux-saga/effects';

function* fetchAnnouncements() {
    try {
        const response = yield axios({
            method: 'GET',
            url: '/api/announcements'
        })
        yield put({
            type: 'SET_ANNOUNCEMENTS',
            payload: response.data
        });
    } catch(err) {
        console.log('Error in announcements SAGA', err);
    };
};

function* announcementsSaga() {
    yield takeLatest('FETCH_ANNOUNCEMENTS', fetchAnnouncements);
};

export default announcementsSaga;