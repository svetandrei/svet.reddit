import { hot } from "react-hot-loader/root";
import * as React from "react";
import "./header.css";
import {SearchBlock} from "./SearchBlock";
import {ThreadTitle} from "./ThreadTitle";
import {SortBlock} from "./SortBlock";
import {UserBlock} from "./UserBlock";
import {useUserReddit} from "../../hooks/useUserReddit";

function HeaderComponent() {
  const {data, loading} = useUserReddit();

  return (
    <header className="header">
      <SearchBlock/>
      <ThreadTitle/>
      <SortBlock/>
      <UserBlock userAvatar={data.avatar} username={data.name} loading={loading}/>
    </header>
  );
}

export const Header = hot(HeaderComponent);
