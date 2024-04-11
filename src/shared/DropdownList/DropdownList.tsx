import React from 'react';
import './dropdownlist.css';
import {createPortal} from "react-dom";

interface IDropdownListProps {
  children: React.ReactNode,
  dropDown?: string
}

export function DropdownList({children, dropDown}: IDropdownListProps) {
  const dropDownNode = document.querySelector(`#drop-down-${dropDown}`);
  if (!dropDownNode) return null;

  return createPortal((
      <div className="list" >
        {children}
      </div>
  ), dropDownNode, dropDown);
}
