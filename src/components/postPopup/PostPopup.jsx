
import React from 'react';
import "./postPopup.scss"


const PostPopup = ({ post, onClose }) => {

  const handlePopupClick = (e) => {
    // Close the popup if clicked outside the content area
    if (e.target.classList.contains('postPopupBody')) {
      onClose();
    }
  };


  return (
    <div className="postPopupBody" onClick={handlePopupClick}>
    <div className="postPopup" >
      <button onClick={onClose} style={{ float: 'right' }}>Close</button>
      <h2>{post.title}</h2>
      <p>{post.body}</p>
    </div>
    </div>
  );
};



export default PostPopup;
