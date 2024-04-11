import React, {useContext, useEffect, useLayoutEffect, useRef} from 'react';
import './post.css';
import {createPortal} from 'react-dom';
import {CommentForm} from "../CommentForm";
import {KarmaCounter} from "../CardsList/Card/KarmaCounter";
import {Comments} from "../CardsList/Card/Comments";
import {Actions} from "../CardsList/Card/Actions";
import {GenericList} from "../GenericList";
import {Text} from "../Text";
import {Icon} from "../Icon";
import {EIcons} from "../../utils/react/EIcons";
import {generateID} from "../../utils/react/generateRandomIndex";
import {useCommentsReddit} from "../../hooks/useCommentsReddit";
import {CommentList} from "../CommentList";
import {formatDate} from "../../utils/js/formatDate";
import useOnClickOutside from "../../hooks/useOnClickOutside";
import {CommentFormik} from "../CommentFormik";
import {useSelector} from "react-redux";
import {rootState} from "../../store/reducer";
import {useNavigate, useParams} from "react-router-dom";

const LIST = [
  { As: 'a' as const, text: <Text children={'Комментарии'} size={14}/>, className: 'list__item-link', icon: <Icon size={16} name={EIcons.comment}/>},
  { As: 'a' as const, text: <Text children={'Поделиться'} size={14}/>, className: 'list__item-link', icon: <Icon size={16} name={EIcons.share}/>},
  { As: 'a' as const, text: <Text children={'Скрыть'} size={14}/>, className: 'list__item-link', icon: <Icon size={16} name={EIcons.hidden}/>},
  { As: 'a' as const, text: <Text children={'Сохранить'} size={14}/>, className: 'list__item-link', icon: <Icon size={16} name={EIcons.save}/>},
  { As: 'a' as const, text: <Text children={'Пожаловаться'} size={14}/>, className: 'list__item-link', icon: <Icon size={16} name={EIcons.warning}/>},
  { As: 'a' as const, text: <Text children={'54% Проголосовали'} size={14}/>, className: 'list__item-link last-item'}
].map(generateID);

interface IPostData {
  onClose?: () => void
}

export function Post({onClose}: IPostData) {
  const ref = useRef<any>();
  const navigate = useNavigate();
  const post = useSelector<rootState, any>(state => state.obj);

  useOnClickOutside(ref, navigate);

  const modalNode = document.querySelector('#modal_root');
  if (!modalNode) return null;

  const [list] = useCommentsReddit(post)

  return createPortal((
    <div className="modal-fixed">
      <div className="modal" ref={ref}>
        <div className="modal__content">
          <div className="modal__top">
            <div className="modal__controls">
              <div className="controls">
                <KarmaCounter/>
                <Comments/>
                <Actions/>
              </div>
            </div>
            <div className="modal__title">
              <h2>{post?.title}</h2>
              <div className="card__meta-data">
                <div className="card__user-link">
                  {post?.sr_detail.icon_img && <img src={post?.sr_detail.icon_img} alt="" className="card__avatar"/>}
                  <a href="#user-url" className="card__username">{post?.sr_detail.name}</a>
                </div>
                <span className="card__created-at">
                  <span className="card__published-label">опубликовано </span>
                  {formatDate(post?.created)} назад
                </span>
              </div>
            </div>
          </div>
          <div className="modal__inner" dangerouslySetInnerHTML={{__html: post?.sr_detail.description}}>
          </div>
          <div className="modal__menu">
            <GenericList list={LIST}/>
          </div>
          <CommentFormik commentUser={post?.sr_detail.name} commentId={post?.id}/>
          <div className="modal__comments comments">
            <div className="comments__sort">
              <span className="comments__sort-name">
                Сортировать по:
                <span className="comments__sort-list">Лучшие
                  {/*<svg xmlns="http://www.w3.org/2000/svg" width="13" height="7" viewBox="0 0 13 7" fill="none">*/}
                  {/*  <path fill-rule="evenodd" clip-rule="evenodd" d="M6.5 7L5.57483e-07 0.623141L0.703795 -1.55181e-06L6.5 5.6864L12.2962 -5.38365e-07L13 0.623142L6.5 7Z" fill="#CC6633"/>*/}
                  {/*</svg>*/}
                </span>
              </span>
            </div>
            <CommentList commentList={list.commentList}/>
          </div>
        </div>
      </div>
    </div>
  ), modalNode);
}
