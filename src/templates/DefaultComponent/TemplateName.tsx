import React, { FC } from 'react';
import styles from './TemplateName.css';

interface TemplateNameProps {}

const TemplateName: FC<TemplateNameProps> = () => (
  <div className={styles.TemplateName}>
    TemplateName Component
  </div>
);

export default TemplateName;
