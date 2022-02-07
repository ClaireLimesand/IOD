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

function* announcementsSaga() {
    yield takeLatest('FETCH_ANNOUNCEMENTS', fetchAnnouncements);
    yield takeLatest('DELETE_ANNOUNCEMENT', deleteAnnouncement);
};

export default announcementsSaga;