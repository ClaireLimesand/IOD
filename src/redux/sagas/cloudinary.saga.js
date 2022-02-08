import axios from 'axios';
import { put, takeLatest } from 'redux-saga/effects';

function* uploadPicture(action) {
    const headers = {
        'content-type': 'multipart/form-data'
      }
    
    const pictureForm = new FormData();
    pictureForm.append('image', action.payload.file);

    try {
        yield axios({
            method: 'PUT',
            url: '/api/picture',
            headers: headers,
            data: pictureForm
        });
        document.location.reload();
    } catch(err) {
        console.error('GET error: ', err);
    }
}

function* uploadBanner(action) {
    const headers = {
        'content-type': 'multipart/form-data'
      }
    
    const bannerForm = new FormData();
    bannerForm.append('image', action.payload.file);

    try {
        yield axios({
            method: 'PUT',
            url: '/api/banner',
            headers: headers,
            data: bannerForm
        });
        document.location.reload();
    } catch(err) {
        console.error('GET error: ', err);
    }
}

function* uploadResume(action) {
    const headers = {
        'content-type': 'multipart/form-data'
      }
    
    const resumeForm = new FormData();
    resumeForm.append('image', action.payload.file);

    try {
        yield axios({
            method: 'PUT',
            url: '/api/resume',
            headers: headers,
            data: resumeForm
        });
    } catch(err) {
        console.error('GET error: ', err);
    }
}

function* fetchResume(action) {
    try {
        const response = yield axios({
            method: 'GET',
            url: '/api/resume',
        });
        console.log(response.data.resume);
        window.open(response.data.resume);
    } catch(err) {
        console.error('GET error: ', err);
    }
}

// Gets students info to see if user already exists
function* retrieveUser(action) {
    try {
        const response = yield axios({
            method: 'GET',
            url: '/api/profile',
        });

        if (response.data.length === 0) {
            console.log(false);
            // Add a new user to the students table  
            yield put({
                type: 'NEW_USER',
            });
        }
    } catch(err) {
        console.error('GET error: ', err);
    }
}


// Checks if the user has a profile
// POST a new row to the students table if they don't exist
function* checkUser(action) {
    try {
        yield axios({
            method: 'POST',
            url: '/api/profile',
        });
    } catch(err) {
        console.error('GET error: ', err);
    }
}

function* cloudinarySaga() {
  yield takeLatest('UPLOAD_PICTURE', uploadPicture);
  yield takeLatest('UPLOAD_BANNER', uploadBanner);
  yield takeLatest('UPLOAD_RESUME', uploadResume);
  yield takeLatest('FETCH_RESUME', fetchResume);
  yield takeLatest('CHECK_USER_EXISTS', retrieveUser);
  yield takeLatest('NEW_USER', checkUser);
}

export default cloudinarySaga;
