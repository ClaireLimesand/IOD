import axios from 'axios';
import { put, takeEvery } from 'redux-saga/effects';

function* fetchStudents() {
    try {
        const response = yield axios({
            method: 'GET',
            url: '/api/students'
        });

        yield put({
            type: 'SET_STUDENTS',
            payload: response.data
        });
    } catch(err) {
        console.log('Error in fetchStudents Saga', err);
    };
}

function* studentsSaga() {
    yield takeEvery('FETCH_STUDENTS', fetchStudents);
};

export default studentsSaga;