import axios from 'axios';
import { put, takeLatest } from 'redux-saga/effects';

function* uploadPicture(action) {
    try {
        yield axios({
            method: 'PUT',
            url: '/api/picture',
            data: {picture: action.payload}
        });
    } catch(err) {
        console.error('GET error: ', err);
    }
}

function* cloudinarySaga() {
  yield takeLatest('UPLOAD_PICTURE', uploadPicture);
}

export default cloudinarySaga;
