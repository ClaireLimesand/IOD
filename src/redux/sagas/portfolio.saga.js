import axios from 'axios';
import { actionChannel, put, takeLatest } from 'redux-saga/effects';

function truncate(str, n){
    return (str.length > n) ? str.substr(0, n-1) + '...' : str;
};

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
    const headers = {
        'content-type': 'multipart/form-data'
      }
    
    const pictureForm = new FormData();
    pictureForm.append('image', action.payload.file);
    
    try {
        yield axios({
            method: 'PUT',
            url: `/api/portfolio/${action.payload.id}`,
            data: action.payload
        });

        yield axios({
            method: 'PUT',
            url: `/api/portfolio/image/${action.payload.id}`,
            headers: headers,
            data: pictureForm
        });
        document.location.reload();

        yield put({ 
            type: 'FETCH_PORTFOLIO'
        })
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
        });

        yield put({
            type: 'SET_FAVORITE_PROJECT',
            payload: {
                project_name: response.data[0].project_name, 
                image: response.data[0].image,
                description: truncate(response.data[0].description, 400)
            }
        })
    }catch(err) {
        console.log('Error in fetchFavoriteProject', err);
        
    }
}

function* detectFavoriteProject(action) {
    try {
        const response = yield axios({
            method: 'GET',
            url: '/api/favoriteProject'
        });

        let exists = false;

        for (let favorite of response.data) {
            if (favorite.user_id === action.payload) {
                exists = true;
            }
        }

        if (exists === false) {
            exists = true;
            yield axios({
                method: 'POST',
                url: '/api/favoriteProject'
            });
        }

        yield put({
            type: 'FETCH_FAVORITE_PROJECT'
        });
    }catch(err) {
        console.log('Error in fetchFavoriteProject', err);  
    }
}

function* detectStudentProject(action) {
    try {
        const response = yield axios({
            method: 'GET',
            url: `/api/favoriteProject/${action.payload}`
        });

        yield put({
            type: 'SET_FAVORITE_PROJECT',
            payload: {
                project_name: response.data[0].project_name, 
                image: response.data[0].image,
                description: truncate(response.data[0].description, 400)
            }
        });
    }catch(err) {
        console.log('Error in fetchFavoriteProject', err);  
    }
}

function* fetchSelectedPortfolio(action) {
    try {
        const response = yield axios({
            method: 'GET',
            url: `/api/portfolio/specific/${action.payload}`
        });
        console.log(response.data);

        yield put({
            type: 'SET_PORTFOLIO',
            payload: response.data
        });
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
    yield takeLatest('DETECT_FAVORITE_PROJECT', detectFavoriteProject);
    yield takeLatest('DETECT_STUDENT_FAVORITE_PROJECT', detectStudentProject);
    yield takeLatest('FETCH_SELECTED_PORTFOLIO', fetchSelectedPortfolio);
};

export default portfolioSaga;