import React, { useState, useEffect } from "react";
import { createApi } from "unsplash-js";
import LikePhoto from "./LikePhoto";

const api = createApi({
  accessKey: process.env.UNSPLASH_API,
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
      : api.photos
          .getRandom({ query: "nature" })
          .then((result) => {
            setPhotoURL(result.response.urls.full);
            setDescription(result.response.location.name);
          })
          .catch(() => console.error);
    return () => console.log("cleanup");
  }, []);

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

  document.body.style.backgroundImage = `url(${photoURL})`;

  return (
    <div className="footer">
      <LikePhoto handlePhotoData={savePhotoData} />
      <div>{description}</div>
    </div>
  );
};

export default PhotoAPI;
