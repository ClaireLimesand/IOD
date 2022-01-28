import React from 'react';
import LogOutButton from '../LogOutButton/LogOutButton';
import {useSelector} from 'react-redux';

function UserPage() {
  let fileURL;

  const handleUpload = (event) => {
    let file = event.target.files[0];
    console.log(file);

    if (file.type != 'application/pdf'){
      console.error(file.name, 'is not a pdf file.')
    } else {
      console.log(file.name, 'Successful upload');
      fileURL = URL.createObjectURL(file);
    }
  }

  const handleSubmit = () => {
    //Open the URL on new Window
    const pdfWindow = window.open();
    pdfWindow.location.href = fileURL; 
  }

  // this component doesn't do much to start, just renders some user reducer info to the DOM
  const user = useSelector((store) => store.user);
  return (
    <div className="container">
      <h2>Welcome, {user.username}!</h2>
      <p>Your ID is: {user.id}</p>
      <LogOutButton className="btn" />

      {/* These <br /> elements are temporary */}
      <br /> 
      <label htmlFor='resume-upload'>Upload Resume</label>
      <input type='file' onChange={handleUpload} id='resume-upload' />
      <br />
      <button onClick={handleSubmit}>View Resume</button>
    </div>
  );
}

// this allows us to use <App /> in index.js
export default UserPage;
