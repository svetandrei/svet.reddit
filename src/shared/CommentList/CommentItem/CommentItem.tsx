import React, {useState} from 'react';
import './commentitem.css';
import {KarmaCounter} from "../../CardsList/Card/KarmaCounter";
import {GenericList} from "../../GenericList";
import {CommentList} from "../CommentList";
import {Text} from "../../Text";
import {Icon} from "../../Icon";
import {EIcons} from "../../../utils/react/EIcons";
import {generateID} from "../../../utils/react/generateRandomIndex";
import {deleteHtml} from "../../../utils/js/deleteHTML";
import {CommentForm} from "../../CommentForm";
import {formatDate} from "../../../utils/js/formatDate";
import {ModalPortal} from "../../ModalPortal";
import {CommentFormik} from "../../CommentFormik";

interface ICommentItemProps {
  item?: {} | any;
}

export function CommentItem({item}: ICommentItemProps) {
  const [isComment, setComment] = useState(false);

  const handleOpenComment = () => {
    setComment(!isComment);
  }

  const LIST = [
    {
      As: 'button' as const, text: <Text children={'Ответить'} size={14}/>, className: 'list__item-link',
      icon: <Icon size={16} name={EIcons.comment}/>, onClick: () => handleOpenComment()
    },
    {
      As: 'button' as const, text: <Text children={'Поделиться'} size={14}/>, className: 'list__item-link',
      icon: <Icon size={16} name={EIcons.share}/>,
    },
    {
      As: 'button' as const, text: <Text children={'Пожаловаться'} size={14}/>, className: 'list__item-link',
      icon: <Icon size={16} name={EIcons.warning}/>,
    },
  ].map(generateID);

  return (
    <li className="comments__item">
      <div className="comments__item-likes">
        <div className="controls">
          <KarmaCounter/>
        </div>
        <span></span>
      </div>
      <div className="comments__item-block">
        <div className="comments__item-top">
          <div className="card__user-link">
            {/*{item?.data.icon_img && <img src={item?.data.icon_img} alt="" className="card__avatar"/>}*/}
            <a href="#user-url" className="card__username">{item?.data.name}</a>
          </div>
          <span className="card__created-at">
            {formatDate(item?.data.created)} назад </span>
          <span className="comments__item-status">
            Лига юристов
          </span>
        </div>
        <div className="comments__item-body">
          {item?.data.body && deleteHtml(item?.data.body)}
        </div>
        <div className="comments__item-bottom">
          <GenericList list={LIST} />
        </div>
        <div className="comments__item-form" id={`comments__form-el-${item?.data.id}`}/>
        {isComment && (
          <ModalPortal children={<CommentFormik commentUser={item?.data.name} commentId={item?.data.id}/>} id={item?.data.id} className={'comments__form'}/>
        )}
        {item?.data.replies  && <CommentList commentList={item?.data.replies.data.children}/>}
      </div>
    </li>
  );
}
