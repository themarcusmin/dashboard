import React, { useState, useEffect } from "react";
import { createApi } from "unsplash-js";
import nodeFetch from "node-fetch";
import LikePhoto from "../components/LikePhoto";

const api = createApi({
  accessKey: process.env.REACT_APP_UNSPLASH_API,
  fetch: nodeFetch,
});

const PhotoAPI = () => {
  const initialPhoto = JSON.parse(window.localStorage.getItem("photo")) || null;
  const initialDescription =
    JSON.parse(window.localStorage.getItem("photoDescription")) || "";
  const [photoURL, setPhotoURL] = useState(initialPhoto);
  const [description, setDescription] = useState(initialDescription);

  useEffect(() => {
    photoURL
      ? null
      : api.photos.getRandom({ query: "nature" }).then((result) => {
          switch (result.type) {
            case "error":
              console.log("Error occured: ", result.errors[0]);
              break;
            case "success":
              setPhotoURL(result.response.urls.full);
              setDescription(result.response.location.name);
              break;
          }
        });
    document.body.style.backgroundImage = `url(${photoURL})`;
  }, [photoURL]);

  const savePhotoData = (liked) => {
    liked
      ? (window.localStorage.setItem("photo", JSON.stringify(photoURL)),
        window.localStorage.setItem(
          "photoDescription",
          JSON.stringify(description)
        ))
      : (window.localStorage.setItem("photo", null),
        window.localStorage.setItem("photoDescription", null));
  };

  return (
    <div className="footer">
      <LikePhoto handlePhotoData={savePhotoData} />
      <div>{description}</div>
    </div>
  );
};

export default PhotoAPI;
