import React, {useRef} from 'react';
import './modalportal.css';
import {createPortal} from "react-dom";

interface IPortalListProps {
  children: React.ReactNode;
  id?: string
  className: string
}

export function ModalPortal({children, id, className}: IPortalListProps) {
  const portalNode = document.querySelector(`#${className}-el-${id}`);
  if (!portalNode) return null;

  return createPortal((
    <div className="portal">
      {children}
    </div>
  ), portalNode, id);
}
