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

function* fetchOneProject(action) {
    try {
        const response = yield axios({
            method: 'GET',
            url: `/api/portfolio/${action.payload}`
        })
        console.log('Project to Edit', response.data[0]);
        yield put({
            type: 'SET_EDITED_PROJECT',
            payload: response.data[0]
        });
    } catch(err) {
        console.log('Error in fetchOneProject Saga', err);
        
    }
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

function* deleteProject(action) {
    try {
        yield axios({
            method: 'DELETE',
            url: `/api/portfolio/${action.payload}`,
        })
        yield put({
            type: 'FETCH_PORTFOLIO'
        })
    } catch(err) {
        console.log('Error in deleteProject Saga', err);
    }
}

function* updateProject(action) {
    try {
        yield axios({
            method: 'PUT',
            url: `/api/portfolio/${action.payload.id}`,
            data: action.payload
        })
        yield put({ type: 'FETCH_PORTFOLIO '})
    } catch(err) {
        console.log('Error in updateProject Saga', err);
        
    }
}

function* storeFavoriteProject(action) {
    try {
        yield axios({
            method: 'PUT',
            url: `/api/favoriteProject`,
            data: action.payload
        })
        yield put({ type: 'FETCH_FAVORITE_PROJECT' })
    } catch(err) {
        console.log('Error in storeFavoriteProject Saga', err);
    }
};

function* fetchFavoriteProject() {
    try {
        const response = yield axios({
            method: 'GET',
            url: '/api/favoriteProject'
        })
        console.log('The Favorite Project Data', response.data);
        yield put({
            type: 'SET_FAVORITE_PROJECT',
            payload: response.data[0]
        })
    }catch(err) {
        console.log('Error in fetchFavoriteProject', err);
        
    }
}

function* portfolioSaga() {
    yield takeLatest('FETCH_PORTFOLIO', fetchPortfolio);
    yield takeLatest('ADD_PROJECT', addProject);
    yield takeLatest('DELETE_PROJECT', deleteProject);
    yield takeLatest('FETCH_EDITED_PROJECT', fetchOneProject);
    yield takeLatest('EDIT_PROJECT', updateProject);
    yield takeLatest('STORE_FAVORITE_PROJECT', storeFavoriteProject);
    yield takeLatest('FETCH_FAVORITE_PROJECT', fetchFavoriteProject);
};

export default portfolioSaga;