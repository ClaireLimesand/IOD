import axios from 'axios';
import { put, takeLatest } from 'redux-saga/effects';

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

function* portfolioSaga() {
    yield takeLatest('FETCH_PORTFOLIO', fetchPortfolio);
};

export default portfolioSaga;