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

function* addSkill(action) {
    console.log('action payload', action.payload)
    try {
        const response = yield axios({
            method: 'POST',
            url: '/api/skills',
            data: action.payload
        })
        yield put({
            type: 'FETCH_SKILLS'
        })
    } catch (error) {
        console.log('addSkill error', error);
    }
}

function* skillsSaga() {
    yield takeEvery('FETCH_SKILLS', fetchSkills);
    yield takeEvery('ADD_SKILL', addSkill);
}

export default skillsSaga;