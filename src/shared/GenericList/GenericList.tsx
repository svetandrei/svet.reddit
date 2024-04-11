import React from 'react';
import './genericlist.css';
import {preventDefault} from "../../utils/react/preventDefault";
import {stopPropagation} from "../../utils/react/propagation";
import {compose} from "../../utils/react/compose";

interface IItemProps {
  text: React.ReactNode;
  id: string;
  onClick?: () => any;
  className ?: string;
  As ?: 'a'| 'li' | 'button' | 'div';
  href ?: string,
  icon ?: React.ReactNode
}

interface IGenericListProps {
  list: IItemProps[];
}

//const noop = () => {}

export function GenericList({list}: IGenericListProps) {

  // @ts-ignore
  return (
    <ul>
      {list.map(({As = 'div', text, icon, onClick , className, id, href}) => (
        <li className="list__item" key={id}>
          <As
            className={className}
            onClick={() => compose(onClick?.(), stopPropagation, preventDefault)}
            // href={href}
          >
            {icon}
            {text}
          </As>
        </li>
      ))}
    </ul>
  );
}
