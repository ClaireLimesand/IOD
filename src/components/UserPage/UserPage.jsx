import React from 'react';
import { useSelector } from 'react-redux';

import UserItem from '../UserItem/UserItem';

function UserPage() {
  // this component doesn't do much to start, just renders some user reducer info to the DOM
  const profile = useSelector((store) => store.profile);

  const url = "https://api.cloudinary.com/v1_1/demo/image/upload";
  const form = document.querySelector("form");

  form.addEventListener("submit", (e) => {
    e.preventDefault();

    const files = document.querySelector("[type=file]").files;
    const formData = new FormData();

    for (let i = 0; i < files.length; i++) {
      let file = files[i];
      formData.append("file", file);
      formData.append("upload_preset", "docs_upload_example_us_preset");

      fetch(url, {
        method: "POST",
        body: formData
      })
        .then((response) => {
          return response.text();
        })
        .then((data) => {
          document.getElementById("data").innerHTML += data;
        });
    }
  });


  return (
    <div className="container">
      <form method="post" enctype="multipart/form-data">
        <input type="file" name="files[]" multiple />
        <input type="submit" value="Upload Files" name="submit" />
      </form>

      <p id="data">
      </p>

      <script  src="./upload.js"></script>
      {profile.map((data) => {
        return <UserItem key={data.id} dataItem={data}/>
      })}
    </div>
  );
}

// this allows us to use <App /> in index.js
export default UserPage;
