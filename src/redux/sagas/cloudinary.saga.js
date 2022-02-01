import axios from 'axios';
import { put, takeLatest } from 'redux-saga/effects';

function* uploadPicture(action) {
    const headers = {
        'content-type': 'multipart/form-data'
      }
    
    const imageForm = new FormData();
    imageForm.append('image', action.payload.selectedFile);

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
