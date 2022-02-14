import axios from 'axios';
import { put, takeEvery } from 'redux-saga/effects';

function* fetchSkills() {
    try {
        const skills = yield axios.get('/api/skills');
        yield put({ 
            type: 'SET_SKILLS', 
            payload: skills.data 
        });
    } catch (error) {
        console.log('fetchSkills error', error);
    }
}

function* fetchStudentsSkills(action) {
    try {
        console.log(action.payload);
        const response = yield axios({
            method: 'GET',
            url: `/api/skills/${action.payload}`
        });

        yield put({ 
            type: 'SET_SKILLS', 
            payload: response.data 
        });
    } catch (error) {
        console.log('fetchSkills error', error);
    }
}

function* addSkill(action) {
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

function* deleteSkill(action) {
    try {
        const response = yield axios({
            method: 'DELETE',
            url: `/api/skills/${action.payload}`,
        })
        yield put({
            type: 'FETCH_SKILLS'
        })
    } catch (error) {
        console.log('deleteSkill error', error);
    }
}

function* editSkill(action) {
    try {
        yield axios({
            method: 'PUT',
            url: `/api/skills/${action.payload.id}`,
            data: action.payload
        })
        yield put({
            type: 'FETCH_SKILLS'
        })
    }   catch (error) {
        console.log(error)
    }
}

function* fetchSingleSkill(action) {
    try {
        const response = yield axios({
            method: 'GET',
            url: `api/skills/${action.payload}`
        })
        yield put ({
            type: 'SET_SKILL_TO_EDIT',
            payload: response.data
        })
    }   catch (error) {
        console.log(error)
    }
}

function* skillsSaga() {
    yield takeEvery('FETCH_SKILLS', fetchSkills);
    yield takeEvery('FETCH_STUDENTS_SKILLS', fetchStudentsSkills);
    yield takeEvery('ADD_SKILL', addSkill);
    yield takeEvery('DELETE_SKILL', deleteSkill);
    yield takeEvery('EDIT_SKILL', editSkill);
    yield takeEvery('FETCH_SINGLE_SKILL', fetchSingleSkill);
}

export default skillsSaga;