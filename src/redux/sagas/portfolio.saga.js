import axios from 'axios';
import { put, takeLatest } from 'redux-saga/effects';

function* fetchthreeMport() {
    try {
        const response = yield axios({
            method: 'GET',
            url: '/api/threeM'
        });
        console.log(response.data);
        yield put({
            type: 'SET_THREEMPORT',
            payload: response.data
        });
    } catch(err) {
        console.log('Error in fetchthreeMport Saga', err);
    };
}

function* fetchSpectrum() {
    try {
        const response = yield axios({
            method: 'GET',
            url: '/api/spectrum'
        });
        console.log('spectrum', response.data);
        yield put({
            type: 'SET_SPECTRUMPORT',
            payload: response.data
        });
    } catch(err) {
        console.log('Error in fetchSpectrum Saga', err);
    };
}

function* portfolioSaga() {
    yield takeLatest('FETCH_THREEMPORT', fetchthreeMport);
    yield takeLatest('FETCH_SPECTRUMPORT', fetchSpectrum);
};

export default portfolioSaga;