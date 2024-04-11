import React from 'react';
import './commentlist.css';
import {CommentItem} from "./CommentItem";

interface ICommentsList {
  commentList?: []
}

export function CommentList({commentList}: ICommentsList) {
  return (
      <ul className="comments">
        {commentList?.map((item: any, index: number) => (
          <CommentItem key={index} item={item}/>
        ))}
      </ul>
  );
}
