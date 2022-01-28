import React from 'react';

// This is one of our simplest components
// It doesn't have local state
// It doesn't dispatch any redux actions or display any part of redux state
// or even care what the redux state is

function InfoPage() {
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

  return (
    <div className="container">
      <p>Info Page</p>
      <input type='file' onChange={handleUpload} />
      <button onClick={handleSubmit}>Open File</button>
    </div>
  );
}

export default InfoPage;
