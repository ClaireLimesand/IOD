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

function* editAbout(action) {
    try {
        yield axios({
            method: 'PUT',
            url: '/api/profile/about',
            data: {text: action.payload}
        });
        yield put({
            type: 'FETCH_PROFILE'
        });
    }   catch (error) {
        console.log(error)
    }
}

function* editTop(action) {
    try {
        yield axios({
            method: 'PUT',
            url: '/api/profile/top',
            data: {
                name: action.payload.name, 
                email: action.payload.email, 
                linkedin: action.payload.linkedin, 
                pronouns: action.payload.pronouns
            }
        });
        yield put({
            type: 'FETCH_PROFILE'
        });
    }   catch (error) {
        console.log(error)
    }
}


function* profileSaga() {
    yield takeLatest('FETCH_PROFILE', fetchProfile);
    yield takeLatest('EDIT_ABOUT', editAbout);
    yield takeLatest('EDIT_TOP', editTop);
};

export default profileSaga;