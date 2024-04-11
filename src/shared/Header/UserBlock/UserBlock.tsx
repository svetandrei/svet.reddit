import React from 'react';
import './userblock.css';
import {AnonIcon} from "../../Icons";
import {EColors, Text} from "../../Text";

interface IUserBlockProps {
  userAvatar?: string,
  username?: string,
  loading?: boolean
}

export function UserBlock({userAvatar, username, loading}: IUserBlockProps) {
  return (
    <a href="https://www.reddit.com/api/v1/authorize?client_id=_hG8eUCiRw0NbVpVCcVstQ&response_type=code&state=random_string&redirect_uri=http://localhost:3000/auth&duration=permanent&scope=read submit identity" className="header__user-block">
      <div className="header__user-avatar">
        {userAvatar ? <img src={userAvatar} alt={username || 'Аноним'} /> : <AnonIcon/>}
      </div>
      <div className="header__user-name">
        {loading ? (
          <Text size={20} color={EColors.grey99}>Загрузка...</Text>
        ):(
          <Text size={20} color={username ? EColors.black : EColors.grey99}>{username || 'Аноним'}</Text>
        )}
      </div>
    </a>
  );
}
