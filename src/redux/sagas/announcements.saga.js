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

function* deleteAnnouncement(action) {
    try {
        const response = yield axios({
            method: 'DELETE',
            url: `/api/announcements/${action.payload}`,
        })
        yield put({
            type: 'FETCH_ANNOUNCEMENTS'
        })
    } catch (error) {
        console.log('DELETE announcement error', error);
    }
}

function* addAnnouncement(action) {
    try {
        const response = yield axios({
            method: 'POST',
            url: '/api/announcements',
            data: action.payload
        })
        yield put({
            type: 'FETCH_ANNOUNCEMENTS'
        })
    } catch (err) {
        console.log('POST announcement error:', err);
    }
}

function* announcementsSaga() {
    yield takeLatest('FETCH_ANNOUNCEMENTS', fetchAnnouncements);
    yield takeLatest('DELETE_ANNOUNCEMENT', deleteAnnouncement);
    yield takeLatest('ADD_ANNOUNCEMENT', addAnnouncement);
};

export default announcementsSaga;