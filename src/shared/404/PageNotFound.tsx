import React, { FC } from 'react';
import styles from './PageNotFound.css';

interface PageNotFoundProps {}

export const PageNotFound: FC<PageNotFoundProps> = () => {
  return (
  <div className={styles.PageNotFound}>
    <div id="classy-error" className="content">
      <img src="//www.redditstatic.com/reddit404e.png" alt=""/>
      <h1>Page not found</h1>
      <div className="errorpage-message"><p>the page you requested does not exist</p>
      </div>
    </div>
  </div>
)
};
