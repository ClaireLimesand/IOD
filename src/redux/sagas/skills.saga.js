import axios from 'axios';
import { put, takeEvery } from 'redux-saga/effects';

function* fetchSkills() {
    try {
        console.log('in fetchSkills')
        const skills = yield axios.get('/api/skills');
        yield put({ 
            type: 'SET_SKILLS', 
            payload: skills.data 
        });
    } catch (error) {
        console.log('fetchSkills error', error);
    }
}

function* skillsSaga() {
    yield takeEvery('FETCH_SKILLS', fetchSkills);
}

export default skillsSaga;