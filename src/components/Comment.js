import React from "react";

function Comment(props) {
  const { nickname, comment, rating } = props.comment;
  return (
    <div className='media mb-3'>
      <img
        className='mr-3 bg-light rounded'
        width='50'
        height='50'
        src={`https://api.adorable.io/avatars/265/abot${nickname.toLowerCase()}@adorable.io.png`}
        alt={nickname}
      />

      <div className='media-body p-2 shadow-sm rounded bg-light border'>
        <median className='float-right text-muted'> Rating: {rating}</median>
        <h6 className='mt-0 mb-1 text-muted'>{nickname}</h6>
        {comment}
      </div>
    </div>
  );
}

export default Comment;
