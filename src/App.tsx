import { hot } from "react-hot-loader/root";
import * as React from "react";
import {Layout} from "./shared/Layout";
import './main.global.css';
import {Header} from "./shared/Header/Header";
import {Content} from "./shared/Content";
import {CardsList} from "./shared/CardsList";
import {applyMiddleware, createStore} from "redux";
import {Provider, useSelector} from "react-redux";
import {composeWithDevTools} from "redux-devtools-extension";
import {rootReducer, rootState} from "./store/reducer";
import {useEffect, useState} from "react";
import thunk from "redux-thunk";
import {saveTokenAsync} from "./store/requestActions";
import {BrowserRouter, Route, Routes, Navigate, useParams} from "react-router-dom";
import {Post} from "./shared/Post";
import {PageNotFound} from "./shared/404";

const store = createStore(rootReducer, composeWithDevTools(
  applyMiddleware(thunk)
))

function AppComponent() {
  const [mounted, setMounted] = useState(false);

  useEffect(() => {
    setMounted(true);
    store.dispatch<any>(saveTokenAsync());
  }, [store]);

  if (!mounted) {
    return null;
  }

  return (
    <BrowserRouter>
      <AppRouter />
    </BrowserRouter>
  );
}

function AppRouter() {
  return (
    <Layout>
      <Header />
      <Content>
        <Routes>
          <Route path="/" element={<Navigate to="/posts" replace />} />
          <Route path="auth" element={<Navigate to="/posts" replace />} />
          <Route path="404" element={<PageNotFound />} />
          <Route path="posts" element={<CardsList />}>
            <Route path=":id" element={<Post />} />
          </Route>
          <Route path="*" element={<Navigate to="/404" replace />} />
        </Routes>
      </Content>
    </Layout>
  );
}


export const App = hot(() =>
  (
    <Provider store={store}>
      <AppComponent/>
    </Provider>
  ));
