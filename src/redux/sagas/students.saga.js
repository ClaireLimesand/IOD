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

function* fetchStudentProfile(action) {
    const studentId= action.payload;
    try {
        const response = yield axios({
            method: 'GET',
            url: `/api/user/${studentId}`
        })
        yield put({
            type: 'SET_PROFILE',
            payload: response.data
        })

    } catch (err) {
        console.error('GET profile by student id', err);
    }
}

function* studentsSaga() {
    yield takeEvery('FETCH_STUDENTS', fetchStudents);
    yield takeEvery('GET_STUDENT', fetchStudentProfile);
};

export default studentsSaga;