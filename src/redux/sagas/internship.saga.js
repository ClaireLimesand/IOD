import axios from 'axios';
import { put, takeLatest } from 'redux-saga/effects';

function* fetchInternships(action) {
    try {
        // Make an axios request to the server for tasks
        const response = yield axios({
            method: 'GET',
            url: '/api/internship'
        })
        
        // Update the internships
        yield put({
            type: 'SET_INTERNSHIPS',
            payload: response.data
        });
    } catch(err) {
        console.error('GET error: ', err);
    }
}

function* addInternship(action) {
    try {
        const response = yield axios({
            method: 'POST',
            url: '/api/internship',
            data: action.payload
        })
        yield put({
            type: 'FETCH_INTERNSHIPS'
        })
    } catch (err) {
        console.log('POST internhsip error:', err);
    }
}

function* internshipSaga() {
    yield takeLatest('FETCH_INTERNSHIPS', fetchInternships);
    yield takeLatest('ADD_INTERNSHIP', addInternship);
}

export default internshipSaga;
