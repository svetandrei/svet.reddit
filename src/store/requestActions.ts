import {Action, ActionCreator} from "redux";
import {ThunkAction} from "redux-thunk";
import {rootState, setToken} from "./reducer";
import axios from "axios";
import {IUserData} from "../hooks/useUserReddit";
import {IPostData} from "../hooks/usePostReddit";

export const REQUEST = "REQUEST";
export type RequestAction = {
  type: typeof REQUEST;
}
export const Request: ActionCreator<RequestAction> = () => ({
  type: REQUEST
})

export const USER_REQUEST_SUCCESS = "USER_REQUEST_SUCCESS";
export type UserRequestSuccessAction = {
  type: typeof USER_REQUEST_SUCCESS;
  user: IUserData
}
export const UserRequestSuccess: ActionCreator<UserRequestSuccessAction> = (user: IUserData) => ({
  type: USER_REQUEST_SUCCESS,
  user
})

export const POST_REQUEST_SUCCESS = "POST_REQUEST_SUCCESS";
export type PostRequestSuccessAction = {
  type: typeof POST_REQUEST_SUCCESS;
  cards: IPostData
}
export const PostRequestSuccess: ActionCreator<PostRequestSuccessAction> = (cards: IPostData) => ({
  type: POST_REQUEST_SUCCESS,
  cards,
})

export const REQUEST_ERROR = "REQUEST_ERROR";
export type RequestErrorAction = {
  type: typeof REQUEST_ERROR;
  error: string
}
export const RequestError: ActionCreator<RequestErrorAction> = (error: string) => ({
  type: REQUEST_ERROR,
  error
})

export const REQUEST_FINALLY = "REQUEST_FINALLY";
export type RequestFinallyAction = {
  type: typeof REQUEST_FINALLY
}
export const RequestFinally: ActionCreator<RequestFinallyAction> = () => ({
  type: REQUEST_FINALLY
})



export const userRequestAsync = (): ThunkAction<void, rootState, unknown, Action<string>> => (dispatch, getState) => {
  dispatch(Request());
  axios.get('https://oauth.reddit.com/api/v1/me', {
    headers: {Authorization: `bearer ${getState().token}`}
  }).then((res) => {
    const img = res.data.icon_img.replaceAll("&amp;", "&");
    dispatch(UserRequestSuccess({name: res.data.name, avatar: img}));
  }).catch((error) => {
    dispatch(RequestError(String(error)));
  })
}

export const postRequestAsync = (scrolling: boolean): ThunkAction<void, rootState, unknown, Action<string>> => (dispatch, getState) => {
  const dataState = getState().data.cards;
  let params = {};
  if (scrolling) {
    params = {
      limit: 5,
      after: dataState.after
    };
  }

  dispatch(Request())
  axios.get('https://oauth.reddit.com/best.json?sr_detail=true', {
    headers: {
      Authorization: `bearer ${getState().token}`,
    },
    params: params
  }).then((res) => {
    dispatch(PostRequestSuccess({
      cards: (undefined !== dataState.cards && scrolling) ? dataState.cards?.concat(...res.data.data.children) : res.data.data.children,
      after: scrolling ? res.data.data.after : null
    }))
  }).catch((error) => {
    dispatch(RequestError(String(error)));
  }).finally(() => {
    dispatch(RequestFinally())
  })
}

export const saveTokenAsync = (): ThunkAction<void, rootState, unknown, Action<string>> => (dispatch) => {
  const token = localStorage.getItem('token') || window.__token__;
  dispatch(setToken(window.__token__));
  if (token) {
    localStorage.setItem('token', token);
  }
}
