import React, {useState} from 'react';
import './data.css';
import {formatDate} from "../../../../utils/js/formatDate";
import {Link} from "react-router-dom";

interface IItemProps {
 item: {} | any
}

export function Data({item}: IItemProps) {
  return (
    <div className="card__text-content">
      <div className="card__meta-data">
        <div className="card__user-link">
          {item?.sr_detail.icon_img && <img src={item?.sr_detail.icon_img} alt="" className="card__avatar"/>}
          <a href="#user-url" className="card__username">{item?.sr_detail.name}</a>
        </div>
        <span className="card__created-at">
                <span className="card__published-label">опубликовано </span>
          {formatDate(item?.created)} назад
        </span>
      </div>
      <h2 className="card__title">
        <Link to={`/posts/${item?.id}`} className="card__post-link">{item?.title}</Link>
      </h2>
    </div>
  );
}
