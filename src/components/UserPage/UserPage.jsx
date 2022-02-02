import React from 'react';
import {useSelector, useDispatch } from 'react-redux';
import UserItem from '../UserItem/UserItem';
import {useEffect} from 'react';

function UserPage() {
 // this component doesn't do much to start, just renders some user reducer info to the DOM
  const profile = useSelector((store) => store.profile);

  const dispatch= useDispatch();
  useEffect (()=>{
    dispatch({type:'FETCH_USER'})
  },[profile.value])
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
      {profile.map((data) => {
        return <UserItem key={data.id} dataItem={data}/>
      })}
    </div>
  );
}

// this allows us to use <App /> in index.js
export default UserPage;
