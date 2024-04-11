import React, {useState} from 'react';
import './card.css';
import {Data} from './Data';
import {Comments} from "./Comments";
import {KarmaCounter} from "./KarmaCounter";
import {Actions} from "./Actions";
import {Preview} from "./Preview";
import {DropdownMenu} from "../../DropdownMenu";
import {GenericList} from "../../GenericList";
import {generateID} from "../../../utils/react/generateRandomIndex";
import {Text} from "../../Text";
import {Icon} from "../../Icon";
import {EIcons} from "../../../utils/react/EIcons";

interface ICardProps {
  key?: number,
  id: string,
  item: {} | any
}

export function Card ({item, id}: ICardProps) {

  const LIST = [
    { As: 'a' as const, text: <Text children={'Комментарии'} size={14}/>, className: 'list__item-link', icon: <Icon size={16} name={EIcons.comment}/>},
    { As: 'a' as const, text: <Text children={'Поделиться'} size={14}/>, className: 'list__item-link', icon: <Icon size={16} name={EIcons.share}/>},
    { As: 'a' as const, text: <Text children={'Скрыть'} size={14}/>, className: 'list__item-link', icon: <Icon size={16} name={EIcons.hidden}/>},
    { As: 'a' as const, text: <Text children={'Сохранить'} size={14}/>, className: 'list__item-link', icon: <Icon size={16} name={EIcons.save}/>},
    { As: 'a' as const, text: <Text children={'Пожаловаться'} size={14}/>, className: 'list__item-link', icon: <Icon size={16} name={EIcons.warning}/>},
    { As: 'a' as const, text: <Text children={'Закрыть'} size={14}/>, className: 'list__item-link last-item',}
  ].map(generateID);

  return (
      <li className="card" key={id}>
        <Data item={item}/>
        {item?.thumbnail && <Preview image={item?.thumbnail}/>}
        <div className="card__menu">
          <DropdownMenu dropDown={id} button={<button className="card__menu-button">
            <svg width="5" height="20" viewBox="0 0 5 20" fill="none" xmlns="http://www.w3.org/2000/svg">
              <circle cx="2.5" cy="2.5" r="2.5" fill="#D9D9D9"/>
              <circle cx="2.5" cy="10" r="2.5" fill="#D9D9D9"/>
              <circle cx="2.5" cy="17.5" r="2.5" fill="#D9D9D9"/>
            </svg>
            </button>}>
            <GenericList list={LIST}/>
          </DropdownMenu>
        </div>
        <div className="controls">
          <KarmaCounter/>
          <Comments/>
          <Actions/>
        </div>
    </li>
  );
}
