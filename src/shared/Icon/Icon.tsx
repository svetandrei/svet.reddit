import React from 'react';
import './icon.css';
import classNames from "classnames";
import {EIcons} from "../../utils/react/EIcons";

type Sizes = 28 | 20 | 16 | 14 | 12 | 10;

interface IIconProps {
  name: EIcons;
  size: Sizes | undefined;
}

export function Icon({size = 14, name}: IIconProps) {
  const classes = classNames(
    'svg',
    `svg${size}`
  )
  return (
    <div className={classes}>
      {name}
    </div>
  );
}
