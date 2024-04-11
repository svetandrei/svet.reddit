import {ActionCreator, Reducer} from "redux";
import {
  REQUEST,
  REQUEST_ERROR,
  USER_REQUEST_SUCCESS,
  POST_REQUEST_SUCCESS,
  RequestAction,
  RequestErrorAction,
  UserRequestSuccessAction,
  PostRequestSuccessAction,
  RequestFinallyAction, REQUEST_FINALLY
} from "./requestActions";
import {RequestState, requestReducer} from "./requestReducer";

export type rootState = {
  obj: Object,
  comment: ICommentData,
  token: string,
  data: RequestState,
}

const initialState: rootState = {
  obj: {},
  comment: {},
  token: '',
  data: {
    loading: false,
    error: '',
    end: false,
    user: {},
    cards: {}
  }
}

const UPDATE_COMMENT = 'UPDATE_COMMENT';
const TOKEN = 'TOKEN';
const DETAIL = 'DETAIL';

export interface ICommentData {
  id?: string,
  text?: string
}
type UpdateCommentAction = {
  type: typeof UPDATE_COMMENT;
  comment: ICommentData
}
export const updateComment: ActionCreator<UpdateCommentAction> = (comment: ICommentData) => ({
  type: UPDATE_COMMENT,
  comment,
})

type SetTokenAction = {
  type: typeof TOKEN;
  token: string
}
export const setToken: ActionCreator<SetTokenAction> = (token) => ({
  type: TOKEN,
  token
})

type DetailObjAction = {
  type: typeof DETAIL;
  obj: Object
}
export const detailObj: ActionCreator<DetailObjAction> = (obj) => ({
  type: DETAIL,
  obj
})

export type Action = UpdateCommentAction
  | SetTokenAction
  | DetailObjAction
  | RequestAction
  | UserRequestSuccessAction
  | PostRequestSuccessAction
  | RequestErrorAction
  | RequestFinallyAction;
export const rootReducer: Reducer<rootState, Action> = (state = initialState, action) => {
  switch (action.type) {
    case UPDATE_COMMENT:
      return {
        ...state,
        comment: action.comment
      };
    case TOKEN:
      return {
        ...state,
        token: action.token
      };
    case DETAIL:
      return {
        ...state,
        obj: action.obj
      }
    case REQUEST:
    case USER_REQUEST_SUCCESS:
    case POST_REQUEST_SUCCESS:
    case REQUEST_ERROR:
    case REQUEST_FINALLY:
      return {
        ...state,
        data: requestReducer(state.data, action),
      }
    default:
      return state;
  }
}
