import React from 'react';
import './content.css';

interface IContentProps {
  children?: React.ReactNode
}

export function Content({ children }: IContentProps) {
  return (
    <div className="content">
      { children }
    </div>
  );
}
