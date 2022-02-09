import axios from 'axios';
import { put, takeLatest } from 'redux-saga/effects';

function* fetchCategories() {
    try {
        const response = yield axios({
            method: 'GET',
            url: '/api/categories'
        })
        yield put({
            type: 'SET_CATEGORIES',
            payload: response.data
        });
    } catch(err) {
        console.log('Error in categories SAGA', err);
    };
};

function* categoriesSaga() {
    yield takeLatest('FETCH_CATEGORIES', fetchCategories);
};

export default categoriesSaga;