import axios from 'axios';
import { actionChannel, put, takeLatest } from 'redux-saga/effects';

function* fetchPortfolio() {
    try {
        const response = yield axios({
            method: 'GET',
            url: '/api/portfolio'
        });
        console.log(response.data);
        yield put({
            type: 'SET_PORTFOLIO',
            payload: response.data
        });
    } catch(err) {
        console.log('Error in fetchPortfolio Saga', err);
    };
}

function* addProject(action) {
    try {
        yield axios({
            method: 'POST',
            url: '/api/portfolio',
            data: action.payload
        })
        yield put({ type: 'FETCH_PORTFOLIO'})
    } catch(err) {
        console.log('Error in addProject Saga', err);
    }
};

function* portfolioSaga() {
    yield takeLatest('FETCH_PORTFOLIO', fetchPortfolio);
    yield takeLatest('ADD_PROJECT', addProject);
};

export default portfolioSaga;