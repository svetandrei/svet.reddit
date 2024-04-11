import {
  REQUEST,
  REQUEST_ERROR,
  RequestAction,
  RequestErrorAction,
  UserRequestSuccessAction,
  PostRequestSuccessAction,
  RequestFinallyAction, USER_REQUEST_SUCCESS, POST_REQUEST_SUCCESS, REQUEST_FINALLY,
} from "./requestActions";
import {Reducer} from "redux";
import {IUserData} from "../hooks/useUserReddit";
import {IPostData} from "../hooks/usePostReddit";

export type RequestState = {
  loading: boolean
  end: boolean
  error: string
  user: IUserData
  cards: IPostData
}

type RequestActions = RequestAction
  | UserRequestSuccessAction
  | PostRequestSuccessAction
  | RequestErrorAction
  | RequestFinallyAction;

export const requestReducer: Reducer<RequestState, RequestActions> = (state: any, action) => {
  switch (action.type) {
    case REQUEST:
      return {
        ...state,
        loading: true,
        end: false
      }
    case REQUEST_ERROR:
      return {
        ...state,
        error: action.error,
        loading: false,
      }
    case USER_REQUEST_SUCCESS:
      return {
        ...state,
        user: action.user,
        loading: false,
      }
    case POST_REQUEST_SUCCESS:
      return {
        ...state,
        cards: action.cards,
        loading: false,
      }
    case REQUEST_FINALLY:
      return {
        ...state,
        loading: false,
        end: true,
      }
    default:
      return state;
  }
}
