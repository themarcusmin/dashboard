import React, { useState, useEffect } from "react";

import Checkbox from "@material-ui/core/Checkbox";
import FormControlLabel from "@material-ui/core/FormControlLabel";
import Favorite from "@material-ui/icons/Favorite";
import FavoriteBorder from "@material-ui/icons/FavoriteBorder";

const LikePhoto = ({ handlePhotoData }) => {
  const initialLiked =
    JSON.parse(window.localStorage.getItem("liked")) || false;
  const [liked, setLiked] = useState(initialLiked);

  const handleLiked = () => setLiked(!liked);

  useEffect(() => {
    window.localStorage.setItem("liked", liked);
    handlePhotoData(liked);
  }, [liked]);

  return (
    <div className="heart_checkbox">
      <FormControlLabel
        control={
          <Checkbox
            checked={liked}
            onChange={handleLiked}
            icon={<FavoriteBorder />}
            checkedIcon={<Favorite className="whiteHeart" />}
            name="heart"
          />
        }
        label="I love what I'm seeing"
      />
    </div>
  );
};

export default LikePhoto;
