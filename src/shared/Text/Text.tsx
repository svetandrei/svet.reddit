import React from 'react';
import './text.css';
import classNames from 'classnames';

type TSizes = 28 | 20 | 16 | 14 | 12 | 10;

export enum EColors {
  black = 'black',
  orange = 'orange',
  green = 'green',
  white = 'white',
  grayF4 = 'grayF4',
  greyF3 = 'greyF3',
  greyD9 = 'greyD9',
  greyC4 = 'greyC4',
  grey99 = 'grey99',
  grey66 = 'grey66'
}

class ITextProps {
  As?: 'span'|'h1'|'h2'|'h3'|'h4'|'p'|'div';
  children: React.ReactNode;
  size: TSizes | undefined;
  mobileSize ?: TSizes;
  tabletSize ?: TSizes;
  desktopSize ?: TSizes;
  color?: EColors;
}

export function Text(props: ITextProps) {
  const {As = 'span', children, size, mobileSize, tabletSize, desktopSize, color = EColors.black} = props;
  const classes = classNames(
    `s${size}`,
    `m${mobileSize}`,
    `t${tabletSize}`,
    `d${desktopSize}`,
    color
  );

  return (
    <As className={classes}>
      {children}
    </As>
  );
}
