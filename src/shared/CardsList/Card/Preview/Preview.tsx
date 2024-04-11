import React from 'react';
import './preview.css';


interface IPreviewProps {
  image: string
}

export function Preview({image}: IPreviewProps) {
  return (
    <div className="card__preview">
      <img
        src={image}
        alt="" className="card__preview-img"/>
    </div>
  );
}
